import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://webcsynckneijcrkqzug.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const env = process.env.NODE_ENV || 'development';
const client = process.env.CLIENT || 'daniel';

export default async (req, context) => {
    const request_body = await req.json();
    const seatingData = request_body.data;
    console.log("seatingData: ", JSON.stringify(seatingData));

    const { data, error } = await supabase.from(`seating_data_${env}`).select().eq('client_name', client);
    console.log("data output from supabase", data);
    if (error) {
        console.log("Failed to query data with error: ", error);
        return new Response("error", { status: 500 });
    }
    if (data.length == 0) {
        console.log("No data found. Inserting new data");
        const { _, error } = await supabase.from(`seating_data_${env}`).insert([{ data: JSON.stringify(seatingData), client_name: client }]);
        if (error) {
            console.log("Failed to upload data with error: ", error);
            return new Response("error", { status: 500 });
        }
    } else {
        console.log("Data found. Updating data at id: ", data[0].id);
        const { _, error } = await supabase.from(`seating_data_${env}`).update({ data: JSON.stringify(seatingData) }).eq("client_name", client);
        if (error) {
            console.log("Failed to update data with error: ", error);
            return new Response("error", { status: 500 });
        }
    }
    return new Response("success");
};

export const config = {
    path: "/api/save_seating_data"
  };