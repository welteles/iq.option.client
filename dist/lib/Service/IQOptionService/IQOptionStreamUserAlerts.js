"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IQOptionStreamUserAlerts = void 0;
/*
 * Copyright (C) 2020 Wellington Rocha
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
const stream_1 = require("stream");
const Core = require("../..");
/**
 * Stream user alerts generated.
 */
class IQOptionStreamUserAlerts extends stream_1.Readable {
    /**
     * Constructor.
     *
     * @param iqOptionWS
     */
    constructor(iqOptionWS) {
        super({ objectMode: true });
        this.iqOptionWS = iqOptionWS;
    }
    /**
     * Default read
     */
    _read() { }
    /**
     * Start stream.
     */
    startStream() {
        return Promise.resolve();
    }
    /**
     * Subcribe.
     */
    subscribe() {
        Core.logger().silly("IQOptionStreamUserAlerts::subscribe");
        if (this.iqOptionWS.isConnected()) {
            return Promise.reject("Socket is not connected.");
        }
        const messageAlertChanged = {
            name: Core.IQOptionAction.ALERT_CHANGED,
        };
        const messageAlertTriggered = {
            name: Core.IQOptionAction.ALERT_TRIGGERED,
        };
        return Promise.all([
            this.iqOptionWS.send(Core.IQOptionName.SUBSCRIBE_MESSAGE, messageAlertChanged),
            this.iqOptionWS.send(Core.IQOptionName.SUBSCRIBE_MESSAGE, messageAlertTriggered),
        ]).then();
    }
    /**
     * Listerner event
     */
    async listener() {
        Core.logger().silly("IQOptionStreamUserAlerts::listener");
        this.iqOptionWS
            .socket()
            .on("message", (data) => this.parseMessage(data.toString()));
        return Promise.resolve();
    }
    /**
     * On message.
     *
     * @param message
     */
    parseMessage(message) {
        const messageJSON = JSON.parse(message);
        if (messageJSON.microserviceName === Core.IQOptionAction.USER_ALERTS) {
            this.emit("data", messageJSON.msg);
        }
    }
}
exports.IQOptionStreamUserAlerts = IQOptionStreamUserAlerts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVFPcHRpb25TdHJlYW1Vc2VyQWxlcnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9TZXJ2aWNlL0lRT3B0aW9uU2VydmljZS9JUU9wdGlvblN0cmVhbVVzZXJBbGVydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILG1DQUFrQztBQUNsQyw4QkFBOEI7QUFJOUI7O0dBRUc7QUFDSCxNQUFhLHdCQUNULFNBQVEsaUJBQVE7SUFRaEI7Ozs7T0FJRztJQUNILFlBQW1CLFVBQXNCO1FBQ3JDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssS0FBVSxDQUFDO0lBRXZCOztPQUVHO0lBQ0ksV0FBVztRQUNkLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDWixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsTUFBTSxtQkFBbUIsR0FBRztZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhO1NBQzFDLENBQUM7UUFDRixNQUFNLHFCQUFxQixHQUFHO1lBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWU7U0FDNUMsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUNuQyxtQkFBbUIsQ0FDdEI7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFDbkMscUJBQXFCLENBQ3hCO1NBQ0osQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVO2FBQ1YsTUFBTSxFQUFFO2FBQ1IsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssWUFBWSxDQUFDLE9BQWU7UUFDaEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRTtZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0NBQ0o7QUEvRUQsNERBK0VDIn0=