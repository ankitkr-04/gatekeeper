import { generateTicket } from '../utils/generateTicket';
import fs from 'fs';
import path from 'path';

async function testGenerateTicket() {
  try {
    // Define a sample ticket ID for testing
    const sampleTicketId = 'TEST12345';

    // Call the generateTicket function
    await generateTicket(sampleTicketId);

    // Define the expected file path for the generated PDF
    const filePath = path.join(process.cwd(), 'public', 'tickets', `${sampleTicketId}.pdf`);

    // Check if the PDF file has been created
    if (fs.existsSync(filePath)) {
      console.log('Test passed: E-ticket PDF generated successfully.');
    } else {
      console.error('Test failed: E-ticket PDF not generated.');
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testGenerateTicket();
