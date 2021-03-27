export default {
  // в чат для прослушки всех диалогов, которые создаются/удаляются для него
  join: "CHAT:JOIN",
  leave: "CHAT:LEAVE",
  isOnline: "CHAT:IS_ONLINE",
  // в конкретный диалог
  joinDialog: "DIALOGS:JOIN_DIALOG",
  leaveDialog: "DIALOGS:LEAVE_DIALOG",
  createDialog: "DIALOGS:CREATE_DIALOG",
  deleteDialog: "DIALOGS:DELETE_DIALOG",
  updateDialogsHasRead: "DIALOGS:UPDATE_DIALOGS_HAD_READ",

  sendMessageForUpdateHasRead: "MESSAGES:SEND_MESSAGE_FOR_UPDATE_HAS_READ",
  sendMessage: "MESSAGES:SEND_MESSAGE",
  deleteMessage: "MESSAGES:DELETE_MESSAGE",
  typingMessage: "MESSAGES:TYPING_MESSAGE",
  stopTypingMessage: "MESSAGES:STOP_TYPING_MESSAGE",
  updateMessagesHasRead: "MESSAGES:UPDATE_MESSAGES_HAD_READ",
  // авторизация
  unauthorized: "AUTH:UNAUTHORIZED",
};