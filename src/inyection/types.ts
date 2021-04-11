const TYPES = {
  DomainLogicCreateService: 'DomainLogicCreateService',
  DomainLogicModifyService: 'DomainLogicModifyService',
  DomainLogicDeleteService: 'DomainLogicDeleteService',
  DomainLogicGetServices: 'DomainLogicGetServices',
  DomainLogicCreateAlert: 'DomainLogicCreateAlert',
  DomainLogicStepUpLevelAlert: 'DomainLogicStepUpLevelAlert',
  DomainLogicReceiveTimeout: 'DomainLogicReceiveTimeout',
  DomainLogicCheckAlert: 'DomainLogicCheckAlert',

  DomainLogicNotifyPerson: 'DomainLogicNotifyPerson',

  TimerAdapterCreateTimerMock: 'TimerAdapterCreateTimerMock',

  PersistanceAdapterCreateService: 'PersistanceAdapterCreateService',
  PersistanceAdapterGetServices: 'PersistanceAdapterGetServices',
  PersistanceAdapterModifyService: 'PersistanceAdapterModifyService',
  PersistanceAdapterDeleteService: 'PersistanceAdapterDeleteService',
  PersistanceAdapterCreateAlertPerson: 'PersistanceAdapterCreateAlertPerson',
  PersistanceAdapterGetAlert: 'PersistanceAdapterGetAlert',
  PersistanceAdapterCreateAlert: 'PersistanceAdapterCreateAlert',
  PersistanceAdapterModifyAlert: 'PersistanceAdapterModifyAlert',
  PersistanceAdapterGetAlertPerson: 'PersistanceAdapterGetAlertPerson',
  PersistanceAdapterModifyAlertIfNotClosed: 'PersistanceAdapterModifyAlertIfNotClosed',

  MailAdapterSendEmail: 'MailAdapterSendEmail',
  SMSAdapterSendSMS: 'SMSAdapterSendSMS',
};

export { TYPES };
export default TYPES;
