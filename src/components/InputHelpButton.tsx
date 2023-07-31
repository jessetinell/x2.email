import { CloseIcon, QuestionIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, IconButton, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

export default function InputHelpButton({ content }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    return (
        <>
            <IconButton aria-label='Search database' icon={<QuestionIcon />} onClick={onOpen} />

            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent w={800}>
                        {content}
                        <AlertDialogFooter>
                            <Button rightIcon={<CloseIcon />} ref={cancelRef} onClick={onClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}