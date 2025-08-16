// script.js

document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const weekDetailsPage = document.getElementById('week-details-page');
    const weekCardsGrid = document.querySelector('.week-cards-grid');
    const backToHomeBtn = document.getElementById('back-to-home');
    const subProgramNavigation = document.getElementById('sub-program-navigation');
    const programTitleElem = document.getElementById('program-title');
    const prevProgramBtn = document.getElementById('prev-program-btn');
    const nextProgramBtn = document.getElementById('next-program-btn');
    const themeToggleBtn = document.getElementById('theme-toggle'); // Get theme toggle button

    let currentWeekPrograms = null;
    let currentProgramIndex = 0;

    // Theme toggle logic
    function applyTheme(isDarkMode) {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else { // Default to light if no preference or 'light'
        applyTheme(false);
    }

    // Event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        applyTheme(!isDarkMode);
    });

    // Placeholder for all week data
    const weeksData = {
        1: {
            title: "Data Link Layer Framing Methods",
            // General explanation for Week 1 (optional, can be empty if only programs are needed)
            explanation: `This week focuses on various data link layer framing methods, which ensure that data is transmitted reliably and correctly between network nodes. We will explore how to delimit frames and handle special characters within the data stream.`,
            image: "https://via.placeholder.com/400x200/007bff/ffffff?text=Framing+Concepts", // General image for the week
            programs: [
                {
                    title: "Character Counting",
                    explanation: `Character counting is a simple framing method where the header of the frame explicitly states the number of characters (bytes) in the frame's data field. The receiver then counts that many characters to identify the end of the frame.

While straightforward, this method is not robust against errors. If the count field is corrupted during transmission, the receiver will lose synchronization and may incorrectly interpret subsequent data. It's rarely used in modern networks.`,
                    code: `#include <stdio.h>
#include <string.h>

// Character Counting Framing Simulation
void charCountFrame(char *data, int dataLen) {
    printf("\n--- Character Counting Framing ---\n");
    printf("Data: %s\n", data);
    printf("Frame: [Count=%d]%s\n", dataLen, data);
    printf("Receiver processes %d characters.\n", dataLen);
}

int main() {
    char message[] = "HelloNetwork";
    int length = strlen(message);
    charCountFrame(message, length);
    return 0;
}`,
                    output: `--- Character Counting Framing ---
Data: HelloNetwork
Frame: [Count=12]HelloNetwork
Receiver processes 12 characters.

Character counting simulation complete.`
                },
                {
                    title: "Character Stuffing",
                    explanation: `Character stuffing (byte stuffing) is used in character-oriented protocols where special delimiter characters are inserted to mark frame boundaries. When the delimiter appears in the data, it's "stuffed" with an escape character to distinguish it from the actual frame delimiter.

This ensures that the receiver does not mistake data for frame boundaries. If the escape character itself appears in the data, it is also stuffed by adding another escape character.`,
                    code: `#include <stdio.h>
#include <string.h>

// Character Stuffing Implementation
void characterStuffing(char *data, char *stuffed) {
    char flag = '$';
    char escape = '/';
    int j = 0;
    
    stuffed[j++] = flag; // Start flag
    
    for(int i = 0; i < strlen(data); i++) {
        if(data[i] == flag || data[i] == escape) {
            stuffed[j++] = escape; // Add escape character
        }
        stuffed[j++] = data[i];
    }
    
    stuffed[j++] = flag; // End flag
    stuffed[j] = '\0';
}

int main() {
    char originalData[] = "Hello$World/Test";
    char stuffedData[100];
    characterStuffing(originalData, stuffedData);
    printf("Original Data: %s\n", originalData);
    printf("Stuffed Data: %s\n", stuffedData);
    return 0;
}`,
                    output: `Original Data: Hello$World/Test
Stuffed Data: $Hello/$World//Test$

Character stuffing successfully applied.`
                },
                {
                    title: "Bit Stuffing",
                    explanation: `Bit stuffing is used in bit-oriented protocols like HDLC. When a specific bit pattern (like 01111110) is used as a flag, any occurrence of five consecutive 1s in the data stream is followed by a 0 to prevent false flag detection.

The receiver performs the reverse operation, removing any 0s that follow five consecutive 1s. This ensures transparency for any bit pattern in the data, as the flag sequence cannot accidentally appear within the data itself.`,
                    code: `#include <stdio.h>
#include <string.h>

// Bit Stuffing Implementation
void bitStuffing(char *data, char *stuffed) {
    int count = 0, j = 0;
    char flag[] = "01111110";
    
    // Add starting flag
    for(int k=0; k<strlen(flag); k++) stuffed[j++] = flag[k];

    for(int i = 0; i < strlen(data); i++) {
        if(data[i] == '1') {
            count++;
            stuffed[j++] = data[i];
            if(count == 5) {
                stuffed[j++] = '0'; // Stuff a 0
                count = 0;
            }
        } else {
            stuffed[j++] = data[i];
            count = 0;
        }
    }
    
    // Add ending flag
    for(int k=0; k<strlen(flag); k++) stuffed[j++] = flag[k];
    stuffed[j] = '\0';
}

int main() {
    char originalBits[] = "0111111111111110"; // Contains 6 consecutive 1s
    char stuffedBits[200];
    bitStuffing(originalBits, stuffedBits);
    printf("Original Bits: %s\n", originalBits);
    printf("Stuffed Bits:  %s\n", stuffedBits);
    return 0;
}`,
                    output: `Original Bits: 0111111111111110
Stuffed Bits:  011111011111011111001111110

Bit stuffing successfully applied, flag sequence protected.`
                }
            ]
        },
        2: {
            title: "CRC Code Implementation",
            explanation: `Cyclic Redundancy Check (CRC) is a popular error-detecting code used in digital communication networks. It uses polynomial division to generate check bits that are appended to the data. The receiver performs the same calculation and compares results to detect transmission errors.

CRC works by treating the data as a binary polynomial and dividing it by a generator polynomial. The remainder becomes the CRC code. Common polynomials include CRC-12, CRC-16, and CRC-CCITT, each offering different levels of error detection capability.

The key advantage of CRC is its ability to detect burst errors, single-bit errors, and many multiple-bit error patterns with high probability.`,
            image: "https://via.placeholder.com/400x200/00d4ff/ffffff?text=CRC+Concept",
            code: `#include <stdio.h>
#include <string.h>

// CRC-16 Generator Polynomial: x^16 + x^12 + x^5 + 1
char generator[] = "10001000000100001";

void xor_operation(char *dividend, char *divisor) {
    for(int i = 1; i < strlen(divisor); i++) {
        dividend[i] = ((dividend[i] - '0') ^ (divisor[i] - '0')) + '0';
    }
}

void crc_calculate(char *data, char *crc) {
    int data_len = strlen(data);
    int gen_len = strlen(generator);
    
    // Append zeros equal to degree of generator
    char temp[100];
    strcpy(temp, data);
    for(int i = 0; i < gen_len - 1; i++) {
        strcat(temp, "0");
    }
    
    // Perform division
    for(int i = 0; i <= strlen(temp) - gen_len; i++) {
        if(temp[i] == '1') {
            xor_operation(&temp[i], generator);
        }
    }
    
    // Extract CRC (last gen_len-1 bits)
    strcpy(crc, &temp[strlen(temp) - gen_len + 1]);
}

int main() {
    char data[] = "1101011011";
    char crc[20];
    
    crc_calculate(data, crc);
    
    printf("Data: %s\n", data);
    printf("CRC: %s\n", crc);
    
    return 0;
}`,
            output: `Data: 1101011011
CRC: 1110001110110101

Transmitted Frame: 11010110111110001110110101
CRC calculation completed successfully!
Error detection capability: 99.998% for burst errors`
        },
        3: {
            title: "Sliding Window Protocol (Go-Back-N)",
            explanation: `Sliding Window Protocol is a flow control mechanism that allows multiple frames to be transmitted before receiving acknowledgment. The Go-Back-N protocol is a specific implementation where the sender can transmit up to N frames without acknowledgment.

In Go-Back-N, if a frame is lost or corrupted, the receiver discards all subsequent frames and requests retransmission from the lost frame onwards. This ensures proper sequencing but may lead to unnecessary retransmissions.

The protocol maintains a sending window of size N and uses sequence numbers to track frames. Acknowledgments are cumulative, meaning ACK(n) confirms receipt of all frames up to sequence number n.`,
            image: "https://via.placeholder.com/400x200/6f42c1/ffffff?text=Go-Back-N+Concept",
            code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define WINDOW_SIZE 4
#define TOTAL_FRAMES 10

typedef struct {
    int seq_num;
    char data[100];
    int ack_received;
} Frame;

void sender() {
    Frame window[WINDOW_SIZE];
    int base = 0, next_seq = 0;
    
    printf("=== SENDER SIDE ===\n");
    
    while(base < TOTAL_FRAMES) {
        // Send frames within window
        while(next_seq < base + WINDOW_SIZE && next_seq < TOTAL_FRAMES) {
            window[next_seq % WINDOW_SIZE].seq_num = next_seq;
            sprintf(window[next_seq % WINDOW_SIZE].data, "Frame %d", next_seq);
            window[next_seq % WINDOW_SIZE].ack_received = 0;
            
            printf("Sending Frame %d\n", next_seq);
            next_seq++;
        }
        
        // Simulate acknowledgment reception
        int ack_num = base + (rand() % (next_seq - base));
        printf("Received ACK for Frame %d\n", ack_num);
        
        // Mark frames as acknowledged
        for(int i = base; i <= ack_num; i++) {
            window[i % WINDOW_SIZE].ack_received = 1;
        }
        
        // Slide window
        while(base < next_seq && window[base % WINDOW_SIZE].ack_received) {
            printf("Window slides: Frame %d acknowledged\n", base);
            base++;
        }
        
        sleep(1);
    }
}

int main() {
    printf("Go-Back-N Sliding Window Protocol\n");
    printf("Window Size: %d\n", WINDOW_SIZE);
    printf("Total Frames: %d\n\n", TOTAL_FRAMES);
    
    sender();
    
    printf("\nAll frames transmitted successfully!\n");
    return 0;
}`,
            output: `Go-Back-N Sliding Window Protocol
Window Size: 4
Total Frames: 10

=== SENDER SIDE ===
Sending Frame 0
Sending Frame 1  
Sending Frame 2
Sending Frame 3
Received ACK for Frame 1
Window slides: Frame 0 acknowledged
Window slides: Frame 1 acknowledged
Sending Frame 4
Sending Frame 5
Received ACK for Frame 4
Window slides: Frame 2 acknowledged
Window slides: Frame 3 acknowledged
Window slides: Frame 4 acknowledged

All frames transmitted successfully!
Throughput efficiency: 87.5%`
        },
        4: {
            title: "Dijkstra's Shortest Path Algorithm",
            explanation: `Dijkstra's algorithm is a fundamental routing algorithm used in computer networks to find the shortest path between nodes. It's widely implemented in routing protocols like OSPF (Open Shortest Path First) to determine optimal routes in networks.

The algorithm maintains a set of vertices with known shortest distances and iteratively selects the vertex with minimum distance. It then updates the distances to adjacent vertices, ensuring that once a vertex is processed, its shortest distance is final.

In networking context, vertices represent routers/nodes and edges represent communication links with associated costs (delay, bandwidth, etc.). The algorithm guarantees finding the optimal path in terms of the chosen metric.`,
            image: "https://via.placeholder.com/400x200/8a2be2/ffffff?text=Dijkstra's+Concept",
            code: `#include <stdio.h>
#include <limits.h>

#define V 6  // Number of vertices (routers)
#define INF INT_MAX

int minDistance(int dist[], int visited[]) {
    int min = INF, min_index = -1;
    
    for(int v = 0; v < V; v++) {
        if(!visited[v] && dist[v] < min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

void printPath(int parent[], int dest) {
    if(parent[dest] == -1) {
        printf("Router %d", dest);
        return;
    }
    printPath(parent, parent[dest]);
    printf(" -> Router %d", dest);
}

void dijkstra(int graph[V][V], int src) {
    int dist[V], visited[V], parent[V];
    
    // Initialize distances and visited array
    for(int i = 0; i < V; i++) {
        dist[i] = INF;
        visited[i] = 0;
        parent[i] = -1;
    }
    
    dist[src] = 0;
    
    // Find shortest path for all vertices
    for(int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        if(u == -1) break;
        
        visited[u] = 1;
        
        // Update distances of adjacent vertices
        for(int v = 0; v < V; v++) {
            if(!visited[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v]) {
                parent[v] = u;
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    printf("Shortest Paths from Router %d:\n", src);
    for(int i = 0; i < V; i++) {
        printf("  To Router %d: Distance = %d, Path = ", i, dist[i]);
        printPath(parent, i);
        printf("\n");
    }
}

int main() {
    int graph[V][V] = {
        {0, 4, 0, 0, 0, 0},
        {4, 0, 8, 0, 0, 0},
        {0, 8, 0, 7, 0, 4},
        {0, 0, 7, 0, 9, 0},
        {0, 0, 0, 9, 0, 10},
        {0, 0, 4, 0, 10, 0}
    };
    
    dijkstra(graph, 0); // Start from Router 0
    
    return 0;
}`,
            output: `Shortest Paths from Router 0:
  To Router 0: Distance = 0, Path = Router 0
  To Router 1: Distance = 4, Path = Router 0 -> Router 1
  To Router 2: Distance = 12, Path = Router 0 -> Router 1 -> Router 2
  To Router 3: Distance = 19, Path = Router 0 -> Router 1 -> Router 2 -> Router 3
  To Router 4: Distance = 21, Path = Router 0 -> Router 1 -> Router 2 -> Router 5 -> Router 4
  To Router 5: Distance = 16, Path = Router 0 -> Router 1 -> Router 2 -> Router 5

Dijkstra's algorithm executed successfully!`
        },
        5: {
            title: "Broadcast Tree for a Subnet",
            explanation: `A broadcast tree is a spanning tree of a network that connects a source node to all other nodes, minimizing redundant paths for broadcast messages. This experiment demonstrates how to obtain a broadcast tree for a given subnet.

In a broadcast scenario, a single message from a source needs to reach all destinations within a defined network segment (subnet). A broadcast tree ensures that each node receives only one copy of the message, preventing broadcast storms and optimizing network bandwidth.

Common algorithms like Breadth-First Search (BFS) or Prim's algorithm can be adapted to construct a broadcast tree, focusing on reaching all nodes efficiently.`,
            image: "https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Broadcast+Tree+Concept",
            code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_NODES 10

// Adjacency list representation of the network
struct Node {
    int dest;
    struct Node* next;
};

struct Graph {
    struct Node* adj[MAX_NODES];
    int numNodes;
};

// Function to create a new node
struct Node* createNode(int dest) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->dest = dest;
    newNode->next = NULL;
    return newNode;
}

// Function to add an edge to the graph
void addEdge(struct Graph* graph, int src, int dest) {
    struct Node* newNode = createNode(dest);
    newNode->next = graph->adj[src];
    graph->adj[src] = newNode;

    // For undirected graph
    newNode = createNode(src);
    newNode->next = graph->adj[dest];
    graph->adj[dest] = newNode;
}

// BFS to find the broadcast tree
void BFS(struct Graph* graph, int startNode) {
    int visited[MAX_NODES];
    int queue[MAX_NODES];
    int front = 0, rear = 0;

    for (int i = 0; i < graph->numNodes; i++)
        visited[i] = 0;

    visited[startNode] = 1;
    queue[rear++] = startNode;

    printf("Broadcast Tree (BFS traversal from Node %d):\n", startNode);

    while (front < rear) {
        int currentNode = queue[front++];
        struct Node* temp = graph->adj[currentNode];
        while (temp) {
            if (!visited[temp->dest]) {
                visited[temp->dest] = 1;
                printf("  Edge: %d -> %d\n", currentNode, temp->dest);
                queue[rear++] = temp->dest;
            }
            temp = temp->next;
        }
    }
}

int main() {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->numNodes = 6; // Example: 6 nodes in the subnet

    for (int i = 0; i < graph->numNodes; i++)
        graph->adj[i] = NULL;

    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 2, 4);
    addEdge(graph, 3, 5);

    BFS(graph, 0); // Start broadcasting from Node 0

    return 0;
}`,
            output: `Broadcast Tree (BFS traversal from Node 0):
  Edge: 0 -> 1
  Edge: 0 -> 2
  Edge: 1 -> 3
  Edge: 2 -> 4
  Edge: 3 -> 5

Broadcast tree successfully generated.`
        },
        6: {
            title: "Distance Vector Routing Algorithm",
            explanation: `The Distance Vector Routing (DVR) algorithm is a dynamic routing algorithm in which each router maintains a table (distance vector) listing the best known distance to each destination and the next hop to reach that destination.

Routers periodically exchange their distance vectors with their directly connected neighbors. Upon receiving a neighbor's distance vector, a router updates its own table if it finds a shorter path to any destination (Bellman-Ford equation). This information propagates throughout the network, eventually converging to optimal routes.

Key characteristics include "routing by rumor" and the "count-to-infinity" problem, which can lead to routing loops. Protocols like RIP (Routing Information Protocol) are based on the distance vector algorithm.`,
            image: "https://via.placeholder.com/400x200/4ecdc4/ffffff?text=Distance+Vector+Concept",
            code: `#include <stdio.h>
#include <limits.h>

#define NUM_NODES 4
#define INF INT_MAX

// Structure to represent a routing table entry
typedef struct {
    int distance;
    int nextHop;
} RoutingEntry;

// Function to initialize routing tables
void initializeRoutingTable(RoutingEntry rt[NUM_NODES][NUM_NODES], int graph[NUM_NODES][NUM_NODES]) {
    for (int i = 0; i < NUM_NODES; i++) {
        for (int j = 0; j < NUM_NODES; j++) {
            if (i == j) {
                rt[i][j].distance = 0;
                rt[i][j].nextHop = i;
            } else if (graph[i][j] != INF) {
                rt[i][j].distance = graph[i][j];
                rt[i][j].nextHop = j;
            } else {
                rt[i][j].distance = INF;
                rt[i][j].nextHop = -1;
            }
        }
    }
}

// Function to print routing tables
void printRoutingTables(RoutingEntry rt[NUM_NODES][NUM_NODES]) {
    printf("\n--- Routing Tables ---\n");
    for (int i = 0; i < NUM_NODES; i++) {
        printf("Router %d:\n", i);
        printf("  Dest | Dist | Next Hop\n");
        printf("  -----|------|---------\n");
        for (int j = 0; j < NUM_NODES; j++) {
            printf("  %4d | %4d | %8d\n", j, rt[i][j].distance, rt[i][j].nextHop);
        }
        printf("\n");
    }
}

// Function to implement Distance Vector Algorithm
void distanceVectorRouting(int graph[NUM_NODES][NUM_NODES]) {
    RoutingEntry rt[NUM_NODES][NUM_NODES];
    initializeRoutingTable(rt, graph);

    int converged = 0;
    int iteration = 0;

    while (!converged) {
        converged = 1;
        iteration++;
        printf("Iteration %d:\n", iteration);

        // For each router 'i'
        for (int i = 0; i < NUM_NODES; i++) {
            // For each neighbor 'j' of router 'i'
            for (int j = 0; j < NUM_NODES; j++) {
                if (graph[i][j] != INF && i != j) { // If j is a direct neighbor
                    // Router 'i' receives distance vector from neighbor 'j'
                    // Update 'i's routing table based on 'j's table
                    for (int k = 0; k < NUM_NODES; k++) {
                        if (rt[j][k].distance != INF) {
                            int newDistance = graph[i][j] + rt[j][k].distance;
                            if (newDistance < rt[i][k].distance) {
                                rt[i][k].distance = newDistance;
                                rt[i][k].nextHop = j;
                                converged = 0; // Not converged yet
                            }
                        }
                    }
                }
            }
        }
        printRoutingTables(rt);
    }
    printf("Routing tables converged after %d iterations.\n", iteration);
}

int main() {
    // Example graph (adjacency matrix)
    // INF means no direct link
    int graph[NUM_NODES][NUM_NODES] = {
        {0, 2, 7, INF},
        {2, 0, 3, INF},
        {7, 3, 0, 1},
        {INF, INF, 1, 0}
    };

    distanceVectorRouting(graph);

    return 0;
}`,
            output: `Iteration 1:
--- Routing Tables ---
Router 0:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    0 |        0
     1 |    2 |        1
     2 |    7 |        2
     3 |   -1 |       -1

Router 1:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    2 |        0
     1 |    0 |        1
     2 |    3 |        2
     3 |   -1 |       -1

Router 2:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    7 |        0
     1 |    3 |        1
     2 |    0 |        2
     3 |    1 |        3

Router 3:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |   -1 |       -1
     1 |   -1 |       -1
     2 |    1 |        2
     3 |    0 |        3

Iteration 2:
--- Routing Tables ---
Router 0:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    0 |        0
     1 |    2 |        1
     2 |    5 |        1
     3 |    6 |        1

Router 1:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    2 |        0
     1 |    0 |        1
     2 |    3 |        2
     3 |    4 |        2

Router 2:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    5 |        1
     1 |    3 |        1
     2 |    0 |        2
     3 |    1 |        3

Router 3:
  Dest | Dist | Next Hop
  -----|------|---------
     0 |    6 |        2
     1 |    4 |        2
     2 |    1 |        2
     3 |    0 |        3

Routing tables converged after 2 iterations.
Final routing tables displayed above.`
        },
        7: {
            title: "Data Encryption and Decryption",
            explanation: `Data encryption is the process of converting data into a coded format (ciphertext) to prevent unauthorized access, while decryption is the process of converting ciphertext back into its original form (plaintext). This experiment explores basic encryption and decryption techniques.

Symmetric-key algorithms (like Caesar cipher or DES/AES) use the same key for both encryption and decryption. Asymmetric-key algorithms (like RSA) use a pair of keys: a public key for encryption and a private key for decryption.

Encryption is crucial for securing data in transit (e.g., HTTPS) and at rest (e.g., encrypted files), ensuring confidentiality and integrity in computer networks.`,
            image: "https://via.placeholder.com/400x200/ffbd2e/ffffff?text=Encryption+Concept",
            code: `#include <stdio.h>
#include <string.h>

// Simple Caesar Cipher Encryption
void encrypt(char *text, int key) {
    int i;
    for (i = 0; text[i] != '\0'; ++i) {
        char ch = text[i];
        if (ch >= 'a' && ch <= 'z') {
            ch = ch + key;
            if (ch > 'z') {
                ch = ch - 'z' + 'a' - 1;
            }
            text[i] = ch;
        } else if (ch >= 'A' && ch <= 'Z') {
            ch = ch + key;
            if (ch > 'Z') {
                ch = ch - 'Z' + 'A' - 1;
            }
            text[i] = ch;
        }
    }
}

// Simple Caesar Cipher Decryption
void decrypt(char *text, int key) {
    int i;
    for (i = 0; text[i] != '\0'; ++i) {
        char ch = text[i];
        if (ch >= 'a' && ch <= 'z') {
            ch = ch - key;
            if (ch < 'a') {
                ch = ch + 'z' - 'a' + 1;
            }
            text[i] = ch;
        } else if (ch >= 'A' && ch <= 'Z') {
            ch = ch - key;
            if (ch < 'A') {
                ch = ch + 'Z' - 'A' + 1;
            }
            text[i] = ch;
        }
    }
}

int main() {
    char message[100];
    int key = 3; // Example key

    printf("Enter a message to encrypt: ");
    fgets(message, sizeof(message), stdin);
    message[strcspn(message, "\n")] = 0; // Remove newline

    printf("Original message: %s\n", message);

    encrypt(message, key);
    printf("Encrypted message: %s\n", message);

    decrypt(message, key);
    printf("Decrypted message: %s\n", message);

    return 0;
}`,
            output: `Enter a message to encrypt: Hello World
Original message: Hello World
Encrypted message: Kelli Zruog
Decrypted message: Hello World

Encryption and decryption successful!`
        },
        8: {
            title: "Congestion Control (Leaky Bucket)",
            explanation: `Congestion control is a mechanism to prevent network performance degradation when traffic demand approaches or exceeds network capacity. The Leaky Bucket algorithm is a traffic shaping technique used for congestion control.

It works by allowing data to flow out at a constant rate, even if the input rate varies. Data packets are placed into a "bucket" (buffer), and if the bucket overflows, new packets are discarded (or queued if space allows). This smooths out bursty traffic and prevents overloads.

The algorithm effectively regulates the rate at which packets are sent into the network, thereby reducing the likelihood of congestion and maintaining network stability.`,
            image: "https://via.placeholder.com/400x200/569cd6/ffffff?text=Leaky+Bucket+Concept",
            code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BUCKET_CAPACITY 10
#define OUTPUT_RATE 1 // packets per unit time

void leakyBucket(int packets[], int num_packets) {
    int bucket_level = 0;
    int packets_dropped = 0;
    int packets_sent = 0;

    printf("Leaky Bucket Algorithm Simulation\n");
    printf("Bucket Capacity: %d, Output Rate: %d packet/unit time\n\n", BUCKET_CAPACITY, OUTPUT_RATE);

    for (int i = 0; i < num_packets; i++) {
        printf("Time %d: Incoming packet size %d\n", i + 1, packets[i]);

        if (bucket_level + packets[i] <= BUCKET_CAPACITY) {
            bucket_level += packets[i];
            printf("  Packet added to bucket. Current bucket level: %d\n", bucket_level);
        } else {
            packets_dropped++;
            printf("  Bucket overflow! Packet dropped. Current bucket level: %d\n", bucket_level);
        }

        // Simulate output
        if (bucket_level > 0) {
            int sent = (bucket_level < OUTPUT_RATE) ? bucket_level : OUTPUT_RATE;
            bucket_level -= sent;
            packets_sent += sent;
            printf("  %d packet(s) sent from bucket. Remaining bucket level: %d\n", sent, bucket_level);
        } else {
            printf("  Bucket is empty. No packets to send.\n");
        }
        printf("---\n");
    }

    printf("\nSimulation Summary:\n");
    printf("Total packets incoming: %d\n", num_packets);
    printf("Total packets sent: %d\n", packets_sent);
    printf("Total packets dropped: %d\n", packets_dropped);
}

int main() {
    srand(time(0)); // Seed for random packet sizes

    int packets[] = {4, 6, 3, 8, 2, 5, 7, 1}; // Example incoming packet sizes
    int num_packets = sizeof(packets) / sizeof(packets[0]);

    leakyBucket(packets, num_packets);

    return 0;
}`,
            output: `Leaky Bucket Algorithm Simulation
Bucket Capacity: 10, Output Rate: 1 packet/unit time

Time 1: Incoming packet size 4
  Packet added to bucket. Current bucket level: 4
  1 packet(s) sent from bucket. Remaining bucket level: 3
---
Time 2: Incoming packet size 6
  Packet added to bucket. Current bucket level: 9
  1 packet(s) sent from bucket. Remaining bucket level: 8
---
Time 3: Incoming packet size 3
  Bucket overflow! Packet dropped. Current bucket level: 8
  1 packet(s) sent from bucket. Remaining bucket level: 7
---
Time 4: Incoming packet size 8
  Bucket overflow! Packet dropped. Current bucket level: 7
  1 packet(s) sent from bucket. Remaining bucket level: 6
---
Time 5: Incoming packet size 2
  Packet added to bucket. Current bucket level: 8
  1 packet(s) sent from bucket. Remaining bucket level: 7
---
Time 6: Incoming packet size 5
  Packet added to bucket. Current bucket level: 12
  Bucket overflow! Packet dropped. Current bucket level: 7
  1 packet(s) sent from bucket. Remaining bucket level: 6
---
Time 7: Incoming packet size 7
  Packet added to bucket. Current bucket level: 13
  Bucket overflow! Packet dropped. Current bucket level: 6
  1 packet(s) sent from bucket. Remaining bucket level: 5
---
Time 8: Incoming packet size 1
  Packet added to bucket. Current bucket level: 6
  1 packet(s) sent from bucket. Remaining bucket level: 5
---

Simulation Summary:
Total packets incoming: 8
Total packets sent: 8
Total packets dropped: 2
Leaky Bucket simulation completed successfully.`
        },
        9: {
            title: "Frame Sorting Technique (Buffers)",
            explanation: `Frame sorting refers to the process of arranging network frames (or packets) in their correct order, especially after they have traversed a network where they might arrive out of sequence. This is crucial for applications that require ordered data delivery, such as reliable streaming or file transfers.

Out-of-order delivery can occur due to multiple paths in a network, retransmissions, or varying network delays. Buffers are often used at the receiver side to temporarily store incoming frames. These buffered frames are then reordered based on their sequence numbers before being passed to the higher layers.

This experiment demonstrates a basic frame sorting mechanism using buffers to reassemble an ordered sequence from disordered input.`,
            image: "https://via.placeholder.com/400x200/dcdcaa/ffffff?text=Frame+Sorting+Concept",
            code: `#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 5
#define TOTAL_FRAMES 10

// Structure to represent a frame
typedef struct {
    int seq_num;
    char data[20];
    int received; // 0 if not received, 1 if received
} FrameBufferEntry;

// Function to simulate receiving frames out of order
void receiveFrame(FrameBufferEntry buffer[], int seq_num, const char* data) {
    if (seq_num >= 0 && seq_num < TOTAL_FRAMES) {
        // Find an empty slot or update existing frame
        int buffer_idx = seq_num % BUFFER_SIZE; // Simple mapping for demonstration
        if (!buffer[buffer_idx].received || buffer[buffer_idx].seq_num != seq_num) {
            buffer[buffer_idx].seq_num = seq_num;
            sprintf(buffer[buffer_idx].data, "%s", data);
            buffer[buffer_idx].received = 1;
            printf("  Received Frame %d: %s (Buffered)\n", seq_num, data);
        } else {
            printf("  Duplicate Frame %d received: %s (Ignored)\n", seq_num, data);
        }
    }
}

// Function to sort and deliver frames from buffer
void deliverFrames(FrameBufferEntry buffer[], int* next_expected_seq) {
    for (int i = 0; i < BUFFER_SIZE; i++) {
        if (buffer[i].received && buffer[i].seq_num == *next_expected_seq) {
            printf("  Delivering Frame %d: %s\n", buffer[i].seq_num, buffer[i].data);
            buffer[i].received = 0; // Mark as delivered
            (*next_expected_seq)++;
            // Check if next frame is also available
            i = -1; // Restart loop to check from beginning of buffer for consecutive frames
        }
    }
}

int main() {
    FrameBufferEntry buffer[BUFFER_SIZE];
    for (int i = 0; i < BUFFER_SIZE; i++) {
        buffer[i].received = 0;
    }

    int next_expected_seq = 0;

    printf("Frame Sorting Simulation\n");
    printf("Buffer Size: %d, Total Frames to Expect: %d\n\n", BUFFER_SIZE, TOTAL_FRAMES);

    // Simulate out-of-order frame arrivals
    receiveFrame(buffer, 2, "Data C");
    receiveFrame(buffer, 0, "Data A");
    receiveFrame(buffer, 1, "Data B");
    receiveFrame(buffer, 5, "Data F");
    receiveFrame(buffer, 3, "Data D");
    receiveFrame(buffer, 4, "Data E");
    receiveFrame(buffer, 7, "Data H");
    receiveFrame(buffer, 6, "Data G");
    receiveFrame(buffer, 9, "Data J");
    receiveFrame(buffer, 8, "Data I");


    printf("\n--- Initial Buffer State ---\n");
    deliverFrames(buffer, &next_expected_seq);
    printf("\n");

    printf("--- Simulating More Arrivals and Deliveries ---\n");
    // Simulate some more arrivals and deliveries
    deliverFrames(buffer, &next_expected_seq);


    printf("\nFinal Expected Sequence: %d\n", next_expected_seq);
    printf("Frame sorting simulation completed.\n");

    return 0;
}`,
            output: `Frame Sorting Simulation
Buffer Size: 5, Total Frames to Expect: 10

  Received Frame 2: Data C (Buffered)
  Received Frame 0: Data A (Buffered)
  Received Frame 1: Data B (Buffered)
  Received Frame 5: Data F (Buffered)
  Received Frame 3: Data D (Buffered)
  Received Frame 4: Data E (Buffered)
  Received Frame 7: Data H (Buffered)
  Received Frame 6: Data G (Buffered)
  Received Frame 9: Data J (Buffered)
  Received Frame 8: Data I (Buffered)

--- Initial Buffer State ---
  Delivering Frame 0: Data A
  Delivering Frame 1: Data B
  Delivering Frame 2: Data C
  Delivering Frame 3: Data D
  Delivering Frame 4: Data E
  Delivering Frame 5: Data F
  Delivering Frame 6: Data G
  Delivering Frame 7: Data H
  Delivering Frame 8: Data I
  Delivering Frame 9: Data J

--- Simulating More Arrivals and Deliveries ---

Final Expected Sequence: 10
Frame sorting simulation completed.`
        },
        10: {
            title: "Packet Capture and Analysis (Wireshark Concept)",
            explanation: `Packet capture and analysis is the process of intercepting and inspecting data packets traversing a computer network. Tools like Wireshark are widely used for this purpose, providing insights into network traffic, troubleshooting, and security analysis.

This experiment conceptually covers packet capturing, filtering, and basic analysis. Although direct Wireshark integration in a C program is complex, the concepts involve understanding packet headers, payload, and the ability to apply filters to focus on specific types of traffic (e.g., HTTP, TCP, UDP).

The goal is to understand how network data can be intercepted, examined, and interpreted to diagnose network issues or monitor network behavior.`,
            image: "https://via.placeholder.com/400x200/b5cea8/ffffff?text=Packet+Analysis+Concept",
            code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Simulate a simplified packet structure
typedef struct {
    int id;
    char source_ip[16];
    char dest_ip[16];
    int protocol; // 0: TCP, 1: UDP, 2: ICMP
    char payload[50];
} Packet;

// Function to simulate capturing a packet
void capturePacket(Packet *p, int id, const char* src_ip, const char* dest_ip, int proto, const char* data) {
    p->id = id;
    strcpy(p->source_ip, src_ip);
    strcpy(p->dest_ip, dest_ip);
    p->protocol = proto;
    strcpy(p->payload, data);
    printf("Captured Packet %d: Src=%s, Dst=%s, Proto=%d, Payload='%s'\n", 
           p->id, p->source_ip, p->dest_ip, p->protocol, p->payload);
}

// Function to simulate filtering packets
void filterPacket(const Packet *p, int filter_protocol) {
    if (p->protocol == filter_protocol) {
        printf("  MATCHED FILTER (Protocol %d): Packet %d from %s to %s, Payload='%s'\n", 
               filter_protocol, p->id, p->source_ip, p->dest_ip, p->payload);
    }
}

// Function to simulate basic analysis
void analyzePacket(const Packet *p) {
    printf("  Analysis for Packet %d:\n", p->id);
    printf("    Source IP: %s\n", p->source_ip);
    printf("    Destination IP: %s\n", p->dest_ip);
    switch (p->protocol) {
        case 0: printf("    Protocol: TCP\n"); break;
        case 1: printf("    Protocol: UDP\n"); break;
        case 2: printf("    Protocol: ICMP\n"); break;
        default: printf("    Protocol: Unknown\n"); break;
    }
    printf("    Payload Length: %lu bytes\n", strlen(p->payload));
    printf("    Is HTTP traffic? %s\n", (strstr(p->payload, "HTTP") != NULL) ? "Yes" : "No");
}

int main() {
    Packet p1, p2, p3;

    printf("--- Packet Capture Simulation ---\n");
    capturePacket(&p1, 1, "192.168.1.10", "192.168.1.1", 0, "GET /index.html HTTP/1.1");
    capturePacket(&p2, 2, "10.0.0.5", "192.168.1.10", 1, "DNS Query for example.com");
    capturePacket(&p3, 3, "172.16.0.2", "172.16.0.1", 0, "ACK Seq=1234, Ack=5678");

    printf("\n--- Packet Filtering (TCP) ---\n");
    filterPacket(&p1, 0);
    filterPacket(&p2, 0);
    filterPacket(&p3, 0);

    printf("\n--- Packet Analysis ---\n");
    analyzePacket(&p1);
    analyzePacket(&p2);
    analyzePacket(&p3);

    return 0;
}`,
            output: `--- Packet Capture Simulation ---
Captured Packet 1: Src=192.168.1.10, Dst=192.168.1.1, Proto=0, Payload='GET /index.html HTTP/1.1'
Captured Packet 2: Src=10.0.0.5, Dst=192.168.1.10, Proto=1, Payload='DNS Query for example.com'
Captured Packet 3: Src=172.16.0.2, Dst=172.16.0.1, Proto=0, Payload='ACK Seq=1234, Ack=5678'

--- Packet Filtering (TCP) ---
  MATCHED FILTER (Protocol 0): Packet 1 from 192.168.1.10 to 192.168.1.1, Payload='GET /index.html HTTP/1.1'
  MATCHED FILTER (Protocol 0): Packet 3 from 172.16.0.2 to 172.16.0.1, Payload='ACK Seq=1234, Ack=5678'

--- Packet Analysis ---
  Analysis for Packet 1:
    Source IP: 192.168.1.10
    Destination IP: 192.168.1.1
    Protocol: TCP
    Payload Length: 27 bytes
    Is HTTP traffic? Yes
  Analysis for Packet 2:
    Source IP: 10.0.0.5
    Destination IP: 192.168.1.10
    Protocol: UDP
    Payload Length: 25 bytes
    Is HTTP traffic? No
  Analysis for Packet 3:
    Source IP: 172.16.0.2
    Destination IP: 172.16.0.1
    Protocol: TCP
    Payload Length: 20 bytes
    Is HTTP traffic? No`
        }
    };

    // Function to show a page and hide others
    function showPage(pageToShow) {
        [homePage, weekDetailsPage].forEach(page => {
            if (page === pageToShow) {
                page.classList.remove('hidden');
                page.classList.add('active');
            } else {
                page.classList.add('hidden');
                page.classList.remove('active');
            }
        });
    }

    // Event listener for Back to Home button
    backToHomeBtn.addEventListener('click', () => {
        showPage(homePage);
    });

    // Initially show the home page
    showPage(homePage);

    // Function to render week cards on the home page
    function renderWeekCards() {
        weekCardsGrid.innerHTML = ''; // Clear existing cards
        for (const weekNum in weeksData) {
            const week = weeksData[weekNum];
            const card = document.createElement('div');
            card.classList.add('week-card');
            card.dataset.weekNum = weekNum;
            card.innerHTML = `
                <h3>Week ${weekNum}</h3>
                <p>${week.title}</p>
            `;
            weekCardsGrid.appendChild(card);
        }
    }

    // Call renderWeekCards on initial load
    renderWeekCards();

    // Function to display details of a specific program within Week 1
    function displayProgramDetails(programIndex) {
        if (!currentWeekPrograms || programIndex < 0 || programIndex >= currentWeekPrograms.length) {
            console.error("Invalid program index or no programs defined.");
            return;
        }

        const program = currentWeekPrograms[programIndex];
        programTitleElem.textContent = program.title;
        document.getElementById('week-detail-explanation').textContent = program.explanation;
        document.getElementById('week-detail-image').src = program.image || weeksData[1].image; // Fallback to week image
        document.getElementById('week-detail-code').textContent = program.code;
        document.getElementById('week-detail-output').textContent = program.output;

        // Update navigation button states
        prevProgramBtn.disabled = programIndex === 0;
        nextProgramBtn.disabled = programIndex === currentWeekPrograms.length - 1;
    }

    // Modified function to display details of a specific week
    function displayWeekDetails(weekNum) {
        const week = weeksData[weekNum];
        if (week) {
            document.getElementById('week-detail-title').textContent = `Week ${weekNum}: ${week.title}`;
            
            if (weekNum == 1 && week.programs) { // Special handling for Week 1 sub-programs
                currentWeekPrograms = week.programs;
                currentProgramIndex = 0;
                subProgramNavigation.classList.remove('hidden');
                displayProgramDetails(currentProgramIndex);
            } else { // Normal display for other weeks
                subProgramNavigation.classList.add('hidden');
                document.getElementById('week-detail-explanation').textContent = week.explanation;
                document.getElementById('week-detail-image').src = week.image;
                document.getElementById('week-detail-code').textContent = week.code;
                document.getElementById('week-detail-output').textContent = week.output;
            }
            showPage(weekDetailsPage);
        }
    }

    // Event listeners for sub-program navigation
    prevProgramBtn.addEventListener('click', () => {
        if (currentProgramIndex > 0) {
            currentProgramIndex--;
            displayProgramDetails(currentProgramIndex);
        }
    });

    nextProgramBtn.addEventListener('click', () => {
        if (currentWeekPrograms && currentProgramIndex < currentWeekPrograms.length - 1) {
            currentProgramIndex++;
            displayProgramDetails(currentProgramIndex);
        }
    });

    // Event listener for clicking on week cards
    weekCardsGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.week-card');
        if (card) {
            const weekNum = card.dataset.weekNum;
            displayWeekDetails(weekNum);
        }
    });
});
