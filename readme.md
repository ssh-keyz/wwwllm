# wwwllm Chrome Extension

## Description

wwwllm is a Chrome extension that allows users to chunk the text content of any web page into smaller, manageable pieces. It processes the text using a sophisticated regex pattern and provides the chunks as a downloadable text file, perfect for training or instructing LLMs.

## Features

- Chunks text from any web page
- Uses a complex regex pattern to identify various text structures (headings, lists, code blocks, etc.)
- Provides results as a downloadable text file
- Displays the total number of chunks found
- Handles a wide range of Markdown and HTML elements
- Supports nested structures like lists and blockquotes
- Processes mathematical expressions and LaTeX-style content
- Respects maximum length constraints for different text elements
- Works with Unicode characters, including emojis
- Mostly preserves the original formatting and structure of the text
- Easy-to-use interface 
- Lightweight and fast processing

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to any web page you want to analyze.
2. Click the Text Chunker icon in your Chrome toolbar.
3. In the popup, click the "Chunk and Download" button.
4. The extension will process the page and automatically download a text file named `text_chunks.txt`.
5. Open the downloaded file to view the chunked text.

## Files

- `manifest.json`: Contains metadata about the extension and its capabilities.
- `popup.html`: Defines the structure of the extension's popup.
- `popup.js`: Contains the JavaScript code for the popup's functionality.
- `content.js`: Runs in the context of web pages and performs the text chunking.

## Development

To modify the chunking behavior, edit the regex pattern in `content.js`. You can adjust the constants at the top of the file to fine-tune the chunking process.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any problems or have any suggestions, please open an issue in this repository.
