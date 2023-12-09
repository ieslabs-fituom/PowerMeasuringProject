import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let deviceName = req.body.deviceName;
        let deviceType = req.body.deviceType;
        let deviceLocation = req.body.deviceLocation;
        let deviceMacAddress = req.body.deviceMacAddress;
        let deviceCurrentThreshold = req.body.deviceCurrentThreshold;
        let userID = req.body.user;

        let query = 'INSERT INTO device (device_name, device_type, device_location, device_mac, device_threshold, user) VALUES (?,?,?,?,?,?)';
        let values = [deviceName, deviceType, deviceLocation, deviceMacAddress, deviceCurrentThreshold, userID];

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