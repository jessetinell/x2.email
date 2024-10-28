import { CloudflareCreateEmailRuleResponse, CloudflareEmailRule, CloudflareListEmailRulesResponse } from "@/services/cloudflare/cloudflare.types";
import { CustomAddress } from "@/types";

function mapRuleToCustomAddress(rule: CloudflareEmailRule): CustomAddress | null {
    const action = rule.actions[0];

    if (action?.type === "forward") {
        const customAddress: CustomAddress = {
            tag: rule.tag,
            from: rule.matchers[0]?.value,
            to: action.value[0],
            enabled: rule.enabled,
        }
        return customAddress;
    }

    return null;

}

export function mapEmailRulesResponseToCustomAddressList(rules: CloudflareEmailRule[]): CustomAddress[] {

    const customAddresses: CustomAddress[] = [];

    for (let i = 0; i < rules.length; i++) {

        const customAddress = mapRuleToCustomAddress(rules[i]);

        if (customAddress) {
            customAddresses.push(customAddress);
        }
    }

    return customAddresses;

}
export function mapCreateEmailRuleResponseToCustomAddress(response: CloudflareCreateEmailRuleResponse | undefined): CustomAddress | null {

    if (response?.success && response.result) {

        const customAddress = mapRuleToCustomAddress(response.result);

        if (customAddress) {
            return customAddress;
        }

    }

    return null;

}