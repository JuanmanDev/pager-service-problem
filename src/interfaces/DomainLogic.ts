/**
 * The person who will be notified during a alert service
 *
 * @interface Person
 */
export interface Person {
  Id: String;
  Name: String;
  SMSNumber?: String;
  Email?: String;
}

/**
 * A Escalation Policy that gives you the list of persons that will be notified
 * at specific level
 *
 * @interface EscalationPolicy
 */
export interface EscalationPolicy {
  Id: String;
  Name: String;
  PersonsLevels: { [level: number]: Person[] }
}

/**
 * A service that could be notify an error
 *
 * @interface Service
 */
export interface Service {
  Id: String;
  Name: String;
  EscalationPolicy: EscalationPolicy;
}

/**
 * Alert information that will be sent to the persons specified in the current
 * level alert.
 *
 * @interface Alert
 */
export interface Alert {
  Id: String;
  /**
     * Service affected
     *
     * @type {Service}
     * @memberof Alert
     */
  Service: Service;
  /**
     * Description of the problem
     *
     * @type {String}
     * @memberof Alert
     */
  Description: String;
  /**
     * Current level number of the alert
     *
     * @type {number}
     * @memberof Alert
     */
  Level: number;
  /**
     * Array for tuples that contains information about every time the alarm scales up.
     * First element in the tuple is the Date and time when the alert has been updated with new level alert,
     * included the firt time (created time)
     * Second element in tuple is the timer identification.
     *
     * @type {Date[]}
     * @memberof Alert
     */
  ScaledTime: [Date, String][];
  /**
     * Date and time when the alert has been closed
     *
     * @type {Date}
     * @memberof Alert
     */
  ClosedTime?: Date;
}

/**
 * Every alert sent to any techinician will be unique
 *
 * @interface AlertPerson
 */
export interface AlertPerson {
  /**
     * Alert to notify
     *
     * @type {Alert}
     * @memberof AlertPerson
     */
  Alert: Alert;
  /**
     * Current level number of the alert when the alert was sent
     *
     * @type {number}
     * @memberof AlertPerson
     */
  Level: number;
  /**
     * Person to notify
     *
     * @type {Person}
     * @memberof AlertPerson
     */
  Person: Person;
  /**
     * Unique Identifier to the alert sent to specific person.
     * This ID will be unique to every technician per alert.
     *
     * @type {String}
     * @memberof AlertPerson
     */
  Id: String;
  /**
     * How will be de identifier sent to the technician.
     *
     * @type {("SMS" | "Email")}
     * @memberof AlertPerson
     */
  Channel: 'SMS' | 'Email';
  /**
     * Date and time when the alert has been sent
     *
     * @type {Date}
     * @memberof AlertPerson
     */
  Date: Date;
}

/**
 * Type for the timeout system
 */
export type HandlerFunctionIdentifier = String;

// Next functions will be called from Pager Web Console (Console Adapter)
export type DomainLogicCreateService = (service: Omit<Service, 'Id'>) => Promise<Service>;
export type DomainLogicGetServices = () => Promise<Service[]>; // TODO add filters, paged, etc...
export type DomainLogicModifyService = (service: Service) => Promise<Service>;
export type DomainLogicDeleteService = (service: Service) => Promise<boolean>;
export type DomainLogicCloseAlert = (alertIdentifier: String) => Promise<boolean>;

// Next functions will be called from Alerting Service (Alerting Adapter)
export type DomainLogicCreateAlert = (serviceIdentifier: String, description: String) => Promise<String>;
// export type DomainLogicCloseAlert = (alertIdentifier: String) => Promise<boolean>; // Repeated

// Next functions will be called from Timer Service (Timer Adapter)
export type DomainLogicReceiveTimeout = (data: { // Maybe this should me moved to TimerAdapter?
  functionIdentifier: HandlerFunctionIdentifier,
  params?: any[]
}) => Promise<void>;
export type DomainLogicCheckAlert = (alertIdentifier: String) => Promise<void>;

// Internal Functions for at least, Serverless implementation:
export type DomainLogicStepUpLevelAlert = (
  escalationPolicy: EscalationPolicy,
  alert: Alert,
  service: Service,
  description: String,
) => Promise<void>;
export type DomainLogicNotifyPerson = (
  person: Person,
  serviceName: String,
  description: String,
  level: number,
  alert: Alert,
) => Promise<void>;
