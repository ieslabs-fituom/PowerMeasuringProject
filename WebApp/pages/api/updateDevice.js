import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let deviceID = req.body.deviceId;
        let deviceName = req.body.deviceName;
        let deviceType = req.body.deviceType;
        let deviceLocation = req.body.deviceLocation;
        let deviceMacAddress = req.body.deviceMacAddress;
        let deviceCurrentThreshold = req.body.deviceCurrentThreshold;

        let query = 'UPDATE device SET device_name = ?, device_type = ?, device_location = ?, device_mac = ?, device_threshold = ? WHERE device_id = ?';
        let values = [deviceName, deviceType, deviceLocation, deviceMacAddress, deviceCurrentThreshold, deviceID];

        const result = await excuteQuery({
            query: query,
            values: values,
        });

        console.log(result);
        if (result && result.affectedRows > 0) {
            res.status(200).json({ result });
        } else {
            res.status(500).json({ result });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({ error });
    }
}