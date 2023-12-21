import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        let typeName = req.body.typeName;
        let userID = req.body.userId;

        let query = 'INSERT INTO device_type (type_name, user) VALUES (?,?)';
        let values = [typeName, userID];

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