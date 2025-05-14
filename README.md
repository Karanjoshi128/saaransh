# Saaransh

Saaransh is an AI-powered PDF summarization web application that helps users quickly extract the key points from lengthy PDF documents. Built with the MERN stack and advanced NLP models, Saaransh enables users to upload PDFs, generate concise summaries, and save them for future reference.

## Features

- 📄 **PDF Upload:** Securely upload your PDF documents.
- 🤖 **AI Summarization:** Generate high-quality summaries using state-of-the-art transformer models (BART, Long-T5, etc.) running locally.
- 📝 **Summary Storage:** Save and manage your summaries in a PostgreSQL (NeonDB) database.
- 🌗 **Dark/Light Mode:** Seamless theme switching for better readability.
- 🔒 **Privacy First:** Your documents are processed securely and not stored longer than necessary.
- ⚡ **Fast & Responsive:** Modern UI with instant feedback and notifications.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express (API routes), PostgreSQL (NeonDB)
- **AI Models:** [@xenova/transformers](https://github.com/xenova/transformers.js) (local inference)
- **PDF Parsing:** pdfplumber, PyMuPDF (for text extraction)
- **Authentication:** (Optional) Clerk or your own solution

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/saaransh.git
   cd saaransh
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your database URL:
     ```
     DATABASE_URL=postgres://username:password@host:port/database
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload a PDF using the "Upload a PDF" button.
2. Wait for the AI to process and summarize your document.
3. View, copy, or save the generated summary.

## Database Schema

```sql
CREATE TABLE pdf_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    original_file_url TEXT NOT NULL,
    summary_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    title TEXT,
    file_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Saaransh** — Summarize smarter, not harder.
