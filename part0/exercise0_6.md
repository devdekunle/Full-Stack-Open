sequenceDiagram
    participant browser
    participant server

    browser->>server: ...
    deactivate server

    Note to right of browser: the spa.js file is executed and the data from the input is added to the notes list
    browser->>server: POST .../new_note_spa
    activate server
    server-->>browser: json response
    deactivate server

