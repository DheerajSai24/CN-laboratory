# Computer Networks Laboratory

A comprehensive web-based learning platform for Computer Networks concepts with an integrated C compiler.

## Features

### 📚 **Learning Modules**
- **10 Weeks of Content** covering essential networking concepts
- **Interactive Examples** with detailed explanations
- **Visual Diagrams** for better understanding
- **Practical C Programs** for each concept

### 💻 **Built-in C Compiler**
- **Real-time Compilation** using Judge0 API
- **Simulation Mode** for offline testing
- **Syntax Highlighting** with line numbers
- **Code Templates** for quick start
- **Interactive Input** handling for scanf statements
- **Error Detection** and reporting

### 🎨 **Modern UI**
- **Dark/Light Theme** toggle
- **Responsive Design** for all devices
- **Smooth Animations** and transitions
- **Professional Styling**

## Topics Covered

1. **Data Link Layer Framing Methods**
   - Character Counting
   - Character Stuffing
   - Bit Stuffing

2. **CRC Code Implementation**
3. **Sliding Window Protocol (Go-Back-N)**
4. **Dijkstra's Shortest Path Algorithm**
5. **Broadcast Tree for a Subnet**
6. **Distance Vector Routing Algorithm**
7. **Data Encryption and Decryption**
8. **Congestion Control (Leaky Bucket)**
9. **Frame Sorting Technique (Buffers)**
10. **Packet Capture and Analysis (Wireshark Concept)**

## Getting Started

### Prerequisites
- A modern web browser
- Python 3.x (for local server)

### Installation

1. **Clone or download** the project files
2. **Navigate** to the project directory:
   ```bash
   cd CN-laboratory
   ```
3. **Start the local server**:
   ```bash
   python -m http.server 8000
   ```
4. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

## Using the C Compiler

### Basic Usage
1. **Select a week** from the home page
2. **Scroll down** to the "C Code Compiler" section
3. **Write your C code** in the editor
4. **Click "Run Code"** to execute

### Code Templates
- Use the **"Code Templates"** dropdown for quick examples
- Templates include: Hello World, Input/Output, Array Operations, Function Examples

### Settings
- Click **"Settings"** to configure the compiler
- Choose between **Judge0 API** (real compilation) or **Simulation Mode**
- For real compilation, get a free API key from [RapidAPI](https://rapidapi.com)

### Features
- **Line Numbers** for easy debugging
- **Syntax Highlighting** for better readability
- **Tab Support** for proper indentation
- **Input Handling** for scanf statements
- **Error Detection** with detailed messages

## Example Programs

### Hello World
```c
#include <stdio.h>
int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### Input/Output
```c
#include <stdio.h>
int main() {
    int number;
    printf("Enter a number: ");
    scanf("%d", &number);
    printf("You entered: %d\n", number);
    return 0;
}
```

### Array Operations
```c
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int i;
    
    printf("Array elements: ");
    for(i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    return 0;
}
```

## File Structure

```
CN-laboratory/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Main stylesheet
├── compiler-styles.css # Compiler-specific styles
└── README.md          # This file
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Functionality
- **Judge0 API** - Real C compilation
- **Local Storage** - Settings persistence

## Contributing

Feel free to contribute by:
- Adding new networking concepts
- Improving the compiler functionality
- Enhancing the UI/UX
- Fixing bugs or issues

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the browser console for debugging information or create an issue in the project repository.

---

**Happy Learning! 🚀**
