# tests-Curotec-Python-Full-Stack
Python Full Stack Assignment 


## Getting Started

To set up this project on your local machine, please follow the steps outlined below.

### Prerequisites
Make sure you have Python installed. You can download it from the [official Python website](https://www.python.org/).

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ManoloCap/tests-Curotec-Python-Full-Stack/tree/main
    cd tests-Curotec-Python-Full-Stack


2. **Create a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux  venv\Scripts\activate  # On Windows
    pip install -r requirements.txt

3. Run Api
    ```bash 
    uvicorn app.main:app --reload


4. TO RUN THE TESTS:
    ```bash
    pytest
    ```
    There is one test for Get Items endpoint