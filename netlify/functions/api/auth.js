export default async (req, context) => {
    const spreadsheetPassword = process.env.REACT_APP_SPREADSHEET_PASSWORD;

    if (req.body.password === spreadsheetPassword) {
        return new Response("success", { status: 200 });
    } else {
        return new Response("Forbidden", { status: 403 });
    }
};