/**
 * The person who will be notified during a alert service
 *
 * @interface Person
 */
export interface Person {
  Id: String;
  Name: String;
  SMSNumber: String;
  Email: String;
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
     * Date and time when the
     *
     * @type {Date[]}
     * @memberof Alert
     */
  ScaledTime: Date[];
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

// Next functions will be called from Pager Web Console (Console Adapter)
export type DomainLogicCreateService = (service: Omit<Service, 'Id'>) => Promise<Service>;
export type DomainLogicGetServices = () => Promise<Service[]>; // TODO add filters, paged, etc...
export type DomainLogicModifyService = (service: Service) => Promise<Service>;
export type DomainLogicDeleteService = (service: Service) => Promise<boolean>;
export type DomainLogicCloseAlert = (alertIdentifier: String) => Promise<boolean>;

// Next functions will be called from Alerting Service (Alerting Adapter)
export type DomainLogicCreateAlert = (serviceIdentifier: String) => Promise<boolean>;
export type DomainLogicStopAler = (serviceIdentifier: String) => Promise<boolean>;

// Next functions will be called from Timer Service (Timer Adapter)
export type DomainLogicCheckAlert = (alertIdentifier: String) => Promise<void>;
