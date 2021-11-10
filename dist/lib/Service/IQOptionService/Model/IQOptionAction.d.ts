/**
 * IQ option action.
 */
export declare enum IQOptionAction {
    CANDLE_GENERATED = "candle-generated",
    PROFILE = "profile",
    BINARY_OPEN_OPTION = "binary-options.open-option",
    BINARY_OPTION_OPENED = "option-opened",
    BINARY_OPTION_CLOSE = "option-closed",
    BINARY_OPTION_REJECT = "option-rejected",
    DIGITAL_OPEN_OPTION = "digital-options.place-digital-option",
    DIGITAL_OPEN_PLACED = "digital-option-placed",
    DIGITAL_OPEN_CLOSED = "digital-option-closed",
    GET_INSTRUMENTS = "get-instruments",
    GET_INITIALIZATION_DATA = "get-initialization-data",
    INITIALIZATION_DATA = "initialization-data",
    GET_TRADERS_MOOD = "get-traders-mood",
    TRADERS_MOOD_CHANGED = "traders-mood-changed"
}
