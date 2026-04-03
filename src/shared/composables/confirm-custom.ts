import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';

export function useCustomConfirm() {
  const confirm = useConfirm();
  const isConfirmVisible = ref(false);
  const confirmMessage = ref('');
  const confirmHeader = ref('');
  const confirmIcon = ref('');
  const confirmAcceptLabel = ref('Yes');
  const confirmRejectLabel = ref('No');

  function showCustomConfirm(options: {
    message?: string;
    header?: string;
    icon?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    accept?: () => void;
    reject?: () => void;
  }) {
    confirmMessage.value = options.message || 'Confirm this action?';
    confirmHeader.value = options.header || 'Confirmation';
    confirmIcon.value = options.icon || 'pi pi-exclamation-triangle';
    confirmAcceptLabel.value = options.acceptLabel || 'Yes';
    confirmRejectLabel.value = options.rejectLabel || 'No';
    isConfirmVisible.value = true;

    confirm.require({
      message: confirmMessage.value,
      header: confirmHeader.value,
      icon: confirmIcon.value,
      acceptLabel: confirmAcceptLabel.value,
      rejectLabel: confirmRejectLabel.value,
      accept: () => {
        isConfirmVisible.value = false;
        options.accept?.();
      },
      reject: () => {
        isConfirmVisible.value = false;
        options.reject?.();
      }
    });
  }

  return {
    ...confirm,
    isConfirmVisible,
    confirmMessage,
    confirmHeader,
    confirmIcon,
    confirmAcceptLabel,
    confirmRejectLabel,
    showCustomConfirm
  };
}
