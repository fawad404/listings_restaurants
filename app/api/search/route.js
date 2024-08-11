import Restaurant from '@/app/utilis/model/restaurant';
import { connectToDB } from '@/app/utilis/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    // Perform the search query (case-insensitive search)
    const results = await Restaurant.find({
      name: { $regex: new RegExp(query, 'i') } // Assuming you're searching by 'name' field
    });
    
    // Function to filter fields based on query
    const filterFields = (data, query) => {
      return data.map(item => {
        const filteredItem = {};
        for (const key in item) {
          if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query.toLowerCase())) {
            filteredItem[key] = item[key];
          } else if (typeof item[key] === 'object') {
            // Recursively filter fields in nested objects
            const filteredObject = filterFields([item[key]], query)[0];
            if (Object.keys(filteredObject).length > 0) {
              filteredItem[key] = filteredObject;
            }
          }
        }
        return filteredItem;
      });
    };

    const filteredResults = filterFields(results, query);

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
