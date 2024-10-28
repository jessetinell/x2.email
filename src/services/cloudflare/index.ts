import type {
  CloudflareBaseResponse,
  CloudflareCreateEmailRuleResponse,
  CloudflareEmailRule,
  CloudflareListEmailDestinationsResponse,
  CloudflareListEmailRouting,
  CloudflareListEmailRulesResponse,
  CloudflareVerifyTokenResponse,
} from "./cloudflare.types";

import fetcher from "../fetcher";

export const CloudflareApiBaseUrl = "/api/cloudflare";

export class CloudflareApiClient {
  baseUrl: string;
  apiToken: string;

  constructor(apiToken: string, baseUrl?: string) {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl || CloudflareApiBaseUrl;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      "Content-Type": "application/json",
    };
  }

  async verifyToken(token?: string) {
    return await fetcher<CloudflareVerifyTokenResponse>(`${this.baseUrl}/user/tokens/verify`, {
      headers: {
        Authorization: `Bearer ${token || this.apiToken}`,
      },
    });
  }

  async getEmailRouting(zoneId: string) {
    return await fetcher<CloudflareListEmailRouting>(
      `${this.baseUrl}/zones/${zoneId}/email/routing`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  async getDestinations(accountId: string) {
    return await fetcher<CloudflareListEmailDestinationsResponse>(
      `${this.baseUrl}/accounts/${accountId}/email/routing/addresses`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  async getEmailRules(zoneId: string): Promise<CloudflareEmailRule[]> {
    let allRules: CloudflareEmailRule[] = [];
    let page = 1;

    while (true) {
      const response = await fetcher<CloudflareListEmailRulesResponse>(
        `${this.baseUrl}/zones/${zoneId}/email/routing/rules?page=${page}&per_page=50`,
        {
          headers: this.getHeaders(),
        },
      );

      if (response.result) {
        allRules = allRules.concat(response.result);
      }

      if (!response.result || response.result.length === 0) {
        break;
      }

      if (allRules.length >= response.result_info.total_count) {
        break;
      }

      page++;
    }

    return allRules;
  }


  async createEmailRule(zoneId: string, rule: Omit<CloudflareEmailRule, "tag">) {
    return await fetcher<CloudflareCreateEmailRuleResponse>(
      `${this.baseUrl}/zones/${zoneId}/email/routing/rules`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(rule),
      },
    );
  }

  async updateEmailRule(zoneId: string, rule: CloudflareEmailRule) {
    return await fetcher<CloudflareCreateEmailRuleResponse>(
      `${this.baseUrl}/zones/${zoneId}/email/routing/rules/${rule.tag}`,
      {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(rule),
      },
    );
  }

  async deleteEmailRule(zoneId: string, tag: string | null) {

    if (!tag) return null;

    return await fetcher<CloudflareBaseResponse<null>>(
      `${this.baseUrl}/zones/${zoneId}/email/routing/rules/${tag}`,
      {
        method: "DELETE",
        headers: this.getHeaders(),
      },
    );
  }
}
