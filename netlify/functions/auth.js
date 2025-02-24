export default async (req, context) => {
    const spreadsheetPassword = process.env.REACT_APP_SPREADSHEET_PASSWORD;
    console.log(spreadsheetPassword);

    const input = req.headers.get("password");
    
    if (input === spreadsheetPassword) {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        }
        return new Response("success", { headers: headers});
    }
    return new Response("Forbidden", { status: 403 });
};

export const config = {
    path: "/api/auth"
  };