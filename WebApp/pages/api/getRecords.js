import excuteQuery from '../../db';

export default async (req, res) => {
    try {
        const currentPage = req.query.page || 1; // Get the current page from the request query, default to page 1 if not provided
        const recordsPerPage = 50;
        const offset = (currentPage - 1) * recordsPerPage;

        const result = await excuteQuery({
            query: 'SELECT * FROM records WHERE device_id = ? ORDER BY record_id DESC LIMIT ? OFFSET ?',
            values: [req.body.deviceId, recordsPerPage, offset],
        });

        //console.log("Result: ", result);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
