# Curso Angular + Websocket


### 01. WebSockets: First Steps

In this section, we will take our first steps into the WebSocket protocol and the necessary configurations to make it work using **Bun** and the **native browser implementation**.

#### Topics Covered

- What are WebSockets: Concept and differences compared to traditional HTTP communication.
- How WebSockets Work: Connection flow, communication, and connection closing.
- WebSocket Server with Bun: Creation and basic configuration of the server.
- Serving HTML Files with BunClient setup to test WebSockets in the browser.
- Client–Server Connection: Establishing the handshake between client and server.
- Native WebSocket API in the Browser: Usage of the main client methods and events.
- Connection and Disconnection Management: Proper handling of the WebSocket lifecycle.
- Sending and Receiving Messages: Bidirectional communication between client and server.
- Message Broadcasting: Sending messages to all connected clients.
- Using Cookies and Search Params: Sending additional information during the connection process.
- Securing WebSocket Connections: Basic validations and access control.

---

### 02. Backend - Political Parties

In this section, we will start creating the actual backend project using Bun.


#### Topics Covered

- Project design and setup
- Server and WebSocket configuration
- Message, error, and response architecture
- State store and services
- Integration between controllers and services
- Real-time communication testing
- Data validation and typing

---

### 03. Angular - Political Parties 

In this section, I have learned how to build an Angular application focused on real-time data visualization and updates, integrating charts and WebSockets from scratch. The goal is to connect forms, the server, and the UI to reflect instant changes.


#### Topics Covered (condensed)

- Structure and initialization of a real-time–oriented Angular project
- Chart.js integration for data visualization
- Chart configuration and customization
- Form design and management with typed data
- Creation and consumption of a WebSocket server
- Connection, reconnection, and message-handling services
- Real-time client–server communication
- Using signals and outputs to react to changes
- Dynamic UI updates and live charts
- Full data CRUD

---

### 04. Backend - Maps & moves

In this section, we will build the backend that enables client geolocation tracking, clearly identifying them and allowing us to record their movements, connections, and disconnections.


#### Topics Covered

- Understand the backend architecture for maps and real-time movement
- Design and structure messages using clear interfaces and types
- Identify and authenticate clients from the initial connection
- Properly validate payloads sent by clients
- Implement decoupled and maintainable message handlers
- Centralize business logic within services
- Configure and use a Store to manage backend state
- Connect handlers with services in a clean way
- Test and verify the correct functioning of the backend
- Log client connections and disconnections in real time

---

### 05. Angular - Maps in real time

In this section, we will learn how to create real-time maps with Angular using WebSockets to synchronize locations and markers between multiple users.

#### Topics Covered

- Integration of interactive maps in Angular
- Real-time communication with WebSockets
- Emitting and synchronizing map positions
- Creating and moving markers in real time
- Dynamically updating and removing markers
- Handling reconnection and application state management

---

### 06. Backend - Queue System

In this section, you will build a real-time ticket/queue application, applying state management, services, and bidirectional communication with WebSockets to solve a complete practical case.

#### Topics Covered

- Architecture and flow of a real-time ticketing app
- Centralized state management using a Store and data types
- Business logic for ticket assignment and management
- Use of WebSockets and message type definitions
- Implementation of handlers and decoupled services
- Testing and validation of the complete real-time flow
