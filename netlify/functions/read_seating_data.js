import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://webcsynckneijcrkqzug.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const env = process.env.NODE_ENV || 'development';

export default async (req, context) => {
    const { data, error } = await supabase.from(`seating_data_${env}`).select();
    console.log("data output from supabase", data);
    if (error) {
        console.log("Failed to query data with error: ", error);
        return new Response("error", { status: 500 });
    }
    const body = objectToReadableStream(data[0]?.data, { chunkSize: 512 });
    return new Response(body, { status: 200 });
};

export const config = {
    path: "/api/get_seating_data"
};

/**
 * Converts an object to a ReadableStream
 * @param {Object} inputObject - The object to convert to a stream
 * @param {Object} options - Optional configuration
 * @param {number} options.chunkSize - Size of each chunk in bytes (default: 1024)
 * @param {string} options.encoding - Encoding to use (default: 'utf-8')
 * @return {ReadableStream} A readable stream containing the object data
 */
function objectToReadableStream(inputObject, options = {}) {
    const { 
      chunkSize = 1024,
      encoding = 'utf-8'
    } = options;
    
    // Convert object to JSON string
    const jsonString = JSON.stringify(inputObject);
    // Convert string to Uint8Array using TextEncoder
    const encoder = new TextEncoder(encoding);
    const data = encoder.encode(jsonString);
    
    let position = 0;
    
    // Create and return a ReadableStream
    return new ReadableStream({
      start(controller) {
        // Optional initialization logic
      },
      
      pull(controller) {
        // If we've processed all data, close the stream
        if (position >= data.length) {
          controller.close();
          return;
        }
        
        // Calculate the size of the next chunk
        const end = Math.min(position + chunkSize, data.length);
        // Get the next chunk of data
        const chunk = data.slice(position, end);
        // Enqueue the chunk to the stream
        controller.enqueue(chunk);
        // Update position for next pull
        position = end;
      },
      
      cancel() {
        // Optional cleanup logic
        position = data.length; // Ensure we stop processing
      }
    });
  }