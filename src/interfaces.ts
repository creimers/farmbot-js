/** Everything the farmbot knows about itself at a given moment in time. */
export interface BotStateTree {
  /** Microcontroller configuration and settings. */
  mcu_params: McuParams;
  /** Cartesian coordinates of the bot. */
  location: [number, number, number];
  /** Lookup table, indexed by number for pin status */
  pins: Pins;
  /** User definable config settings.  */
  configuration: Configuration;
  /** READ ONLY meta data about the FarmBot device. */
  readonly informational_settings: InformationalSettings;
  /** Bag of misc. settings that any script author can use. */
  user_env: Dictionary<(string | undefined)>;
  /** List of user accessible processes running on the bot. */
  process_info: {
    farm_events: ProcessInfo[];
    regimens: ProcessInfo[];
    farmwares: ProcessInfo[];
  };
};

export interface ProcessInfo {
  name: string;
  uuid: string;
  status: string;
}

export enum Encoder {
  unknown = -1,
  quadrature,
  differential
}

export type McuParamName =
  | "encoder_enabled_x"
  | "encoder_enabled_y"
  | "encoder_enabled_z"
  | "encoder_invert_x"
  | "encoder_invert_y"
  | "encoder_invert_z"
  | "encoder_missed_steps_max_x"
  | "encoder_missed_steps_max_y"
  | "encoder_missed_steps_max_z"
  | "encoder_scaling_x"
  | "encoder_scaling_y"
  | "encoder_scaling_z"
  | "encoder_type_x"
  | "encoder_type_y"
  | "encoder_type_z"
  | "movement_axis_nr_steps_x"
  | "movement_axis_nr_steps_y"
  | "movement_axis_nr_steps_z"
  | "movement_enable_endpoints_x"
  | "movement_enable_endpoints_y"
  | "movement_enable_endpoints_z"
  | "movement_home_up_x"
  | "movement_home_up_y"
  | "movement_home_up_z"
  | "movement_invert_endpoints_x"
  | "movement_invert_endpoints_y"
  | "movement_invert_endpoints_z"
  | "movement_invert_motor_x"
  | "movement_invert_motor_y"
  | "movement_invert_motor_z"
  | "movement_keep_active_x"
  | "movement_keep_active_y"
  | "movement_keep_active_z"
  | "movement_max_spd_x"
  | "movement_max_spd_y"
  | "movement_max_spd_z"
  | "movement_min_spd_x"
  | "movement_min_spd_y"
  | "movement_min_spd_z"
  | "movement_secondary_motor_invert_x"
  | "movement_secondary_motor_x"
  | "movement_steps_acc_dec_x"
  | "movement_steps_acc_dec_y"
  | "movement_steps_acc_dec_z"
  | "movement_timeout_x"
  | "movement_timeout_y"
  | "movement_timeout_z"
  | "encoder_missed_steps_decay_x"
  | "encoder_missed_steps_decay_y"
  | "encoder_missed_steps_decay_z"
  | "param_version";

// /** Microcontroller configuration and settings. */
export type McuParams = Partial<Record<McuParamName, (number | undefined)>>;

export type Xyz = "x" | "y" | "z";
/** 3 dimensional vector. */
export type Vector3 = Record<Xyz, number>;

export interface Pin {
  mode: number;
  value: number;
}

export type Pins = Dictionary<Pin | undefined>;

export type ConfigurationName =
  | "os_auto_update"
  | "fw_auto_update"
  | "steps_per_mm_x"
  | "steps_per_mm_y"
  | "steps_per_mm_z";

export type Configuration =
  Partial<Record<ConfigurationName, (boolean | number | undefined)>>;

/** The possible values for the sync_msg property on informational_settings */
export type SyncStatus = "synced" |
  "sync_now" |
  "syncing" |
  "sync_error" |
  "unknown";

export interface InformationalSettings {
  /** Current version of Farmbot OS */
  controller_version?: string | undefined;
  /** Arduino firmware version. */
  firmware_version?: string | undefined;
  /** If the rpi is throttled. (and having wifi issues) */
  throttled?: string | undefined;
  /** Farmbot's private Ip address */
  private_ip?: string | undefined;
  /** In a locked state */
  locked?: boolean | undefined;
  /** The message to be displayed on the frontend for sync status. */
  sync_status?: SyncStatus | undefined;
}

export type MQTTEventName = "connect" | "message";

export interface MqttClient {
  publish: (channel: string, payload: any) => void;
  subscribe: (channel: string | string[]) => void;
  on: (type: MQTTEventName, listener: any) => void;
  once: (type: MQTTEventName, listener: any) => void;
}

export interface Dictionary<T> { [key: string]: T; }

export type StateTree = Dictionary<string | number | boolean>;

export interface ConstructorParams {
  /** API token which can be retrieved by logging into REST server or my.farmbot.io */
  token: string;
  /** Default time to wait (ms) before considering operation a failure. */
  timeout?: number;
  /** Default physical speed for operations. (steps/s?) */
  speed?: number;
}

export interface APIToken {
  /** URL of MQTT server. REST server is not the same as MQTT server. */
  mqtt: string;
  /** UUID of current bot. */
  bot: string;
}
