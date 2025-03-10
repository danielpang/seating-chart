export default async (req, context) => {
    const spreadsheetPassword = process.env.REACT_APP_SPREADSHEET_PASSWORD;
    console.log(spreadsheetPassword);

    const input = req.headers.get("password");
    
    if (input === spreadsheetPassword) {
        return new Response("success");
    }
    return new Response("Unauthorized", { status: 401 });
};

export const config = {
    path: "/api/auth"
  };