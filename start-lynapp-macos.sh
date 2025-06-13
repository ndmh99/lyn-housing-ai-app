#!/bin/bash

# ============================================================================
# SCRIPT INITIALIZATION SECTION
# ============================================================================

# Set script to exit immediately if a command exits with a non-zero status.
# set -e

# ============================================================================
# GLOBAL VARIABLE CONFIGURATION
# ============================================================================

# --- Color Definitions ---
C_RESET='\033[0m'
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[0;33m'
C_BLUE='\033[0;34m'
C_CYAN='\033[0;36m'
C_WHITE='\033[1;37m'

# Lock file to prevent multiple instances
LOCK_FILE="/tmp/lyn_app_lock.tmp"
# PID tracking file for cleanup operations
PID_FILE="/tmp/lyn_app_pids.tmp"

# ============================================================================
# MULTIPLE INSTANCE PROTECTION
# ============================================================================

# Function to check and stop any running instances
function check_and_stop_running_instances() {
    echo -e "${C_CYAN}Checking for running instances...${C_RESET}"
    
    # Check for Django on port 8000
    if lsof -ti:8000 >/dev/null 2>&1; then
        echo -e "${C_YELLOW}Found Django running on port 8000. Stopping...${C_RESET}"
        lsof -ti:8000 | xargs kill -9 >/dev/null 2>&1 || true
        sleep 1
    fi
    
    # Check for React on port 5173
    if lsof -ti:5173 >/dev/null 2>&1; then
        echo -e "${C_YELLOW}Found React running on port 5173. Stopping...${C_RESET}"
        lsof -ti:5173 | xargs kill -9 >/dev/null 2>&1 || true
        sleep 1
    fi
    
    # Remove any existing lock files
    if [ -f "$LOCK_FILE" ]; then
        echo -e "${C_YELLOW}Removing existing lock file...${C_RESET}"
        rm -f "$LOCK_FILE"
    fi
    
    # Remove any existing PID files
    if [ -f "$PID_FILE" ]; then
        echo -e "${C_YELLOW}Removing existing PID file...${C_RESET}"
        rm -f "$PID_FILE"
    fi
    
    echo -e "${C_GREEN}✅ Cleanup of existing instances complete.${C_RESET}"
    echo
}

# Call the function before checking for lock file
check_and_stop_running_instances

if [ -f "$LOCK_FILE" ]; then
    echo -e "${C_YELLOW}⚠️  Another instance of LYN Housing AI App is already running!${C_RESET}"
    echo -e "${C_CYAN}If you are sure no other instance is running, you can delete the lock file: rm $LOCK_FILE${C_RESET}"
    exit 1
fi

# Create lock file to mark this instance as active
touch "$LOCK_FILE"

# ============================================================================
# PROCESS TRACKING CLEANUP
# ============================================================================

# Clear any existing PID tracking files from previous runs
rm -f "$PID_FILE"
touch "$PID_FILE"

# ============================================================================
# TRAP AND CLEANUP FUNCTIONS
# ============================================================================

function do_cleanup() {
    echo -e "\n\n${C_CYAN}Shutting down services and cleaning up...${C_RESET}"

    # Kill all processes whose PIDs are in the PID file
    if [ -f "$PID_FILE" ]; then
        PIDS_TO_KILL=$(cat "$PID_FILE" | tr '\n' ' ')
        if [ -n "$PIDS_TO_KILL" ]; then
            echo -e "${C_YELLOW}Stopping processes with PIDs: $PIDS_TO_KILL. Attempting graceful shutdown...${C_RESET}"
            # Send TERM signal for graceful shutdown
            kill $PIDS_TO_KILL >/dev/null 2>&1 || true
            
            # Wait a couple of seconds
            sleep 2

            # Check if any processes are still running and kill them forcefully
            if ps -p $PIDS_TO_KILL > /dev/null; then
                echo -e "${C_RED}Some services didn't stop, forcing shutdown...${C_RESET}"
                kill -9 $PIDS_TO_KILL >/dev/null 2>&1 || true
            fi
        fi
        rm -f "$PID_FILE"
    fi

    # Remove log files
    echo -e "${C_YELLOW}Removing log files (django.log, react.log)...${C_RESET}"
    rm -f django.log react.log

    # Remove lock file
    echo -e "${C_YELLOW}Removing lock file...${C_RESET}"
    rm -f "$LOCK_FILE"

    # Additional cleanup for any stray processes
    echo -e "${C_YELLOW}Checking for any stray processes...${C_RESET}"
    # Find and kill any remaining Django processes on port 8000
    if lsof -ti:8000 >/dev/null 2>&1; then
        echo -e "${C_YELLOW}Killing any remaining processes on port 8000...${C_RESET}"
        lsof -ti:8000 | xargs kill -9 >/dev/null 2>&1 || true
    fi
    # Find and kill any remaining React processes on port 5173
    if lsof -ti:5173 >/dev/null 2>&1; then
        echo -e "${C_YELLOW}Killing any remaining processes on port 5173...${C_RESET}"
        lsof -ti:5173 | xargs kill -9 >/dev/null 2>&1 || true
    fi

    # Remove any temporary files that might have been created
    echo -e "${C_YELLOW}Cleaning up temporary files...${C_RESET}"
    rm -f /tmp/lyn_app_* 2>/dev/null || true

    echo -e "${C_GREEN}Cleanup complete. Goodbye!${C_RESET}"
}

function handle_interrupt() {
    # This function is triggered by Ctrl+C or `kill -INT`.
    # It just needs to exit; the EXIT trap will handle the actual cleanup.
    # Exiting with 130 is the standard for shells when interrupted by Ctrl+C.
    exit 130
}

# The main cleanup logic runs on ANY script exit.
trap do_cleanup EXIT
# The interrupt handler ensures that Ctrl+C or kill signals cause an exit.
trap handle_interrupt SIGINT SIGTERM

# ============================================================================
# SCRIPT DEPENDENCY VALIDATION SECTION
# ============================================================================

echo -e "${C_CYAN}Checking dependencies...${C_RESET}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${C_RED}❌ ERROR: Python 3 is not installed. Please install Python 3 and try again.${C_RESET}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${C_RED}❌ ERROR: Node.js is not installed. Please install Node.js and try again.${C_RESET}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${C_RED}❌ ERROR: npm is not installed. Please install npm and try again.${C_RESET}"
    exit 1
fi

# Check for Python virtual environment and Django installation within it
VENV_PATH=""
if [ -d "backend/venv" ]; then
    VENV_PATH="backend/venv"
elif [ -d "backend/.venv" ]; then
    VENV_PATH="backend/.venv"
fi

if [ -z "$VENV_PATH" ]; then
    echo -e "${C_RED}❌ ERROR: Python virtualenv not found in 'backend/venv' or 'backend/.venv'${C_RESET}"
    echo "Please create it inside the 'backend' directory (e.g., python3 -m venv venv)."
    exit 1
fi

VENV_PYTHON="$VENV_PATH/bin/python"

if [ ! -f "$VENV_PYTHON" ]; then
    echo -e "${C_RED}❌ ERROR: Python executable not found in '$VENV_PATH/bin/python'.${C_RESET}"
    echo "The virtual environment appears to be broken or incomplete."
    exit 1
fi

if ! $VENV_PYTHON -m pip show django &> /dev/null; then
    echo -e "${C_YELLOW}⚠️ WARNING: Django is not installed in the virtual environment.${C_RESET}"
    echo "To install, run: $VENV_PYTHON -m pip install django"
fi

echo -e "${C_GREEN}✅ All critical dependencies are available.${C_RESET}"
echo

# ============================================================================
# PROJECT STRUCTURE AND FILE VALIDATION
# ============================================================================
echo -e "${C_CYAN}Validating project structure...${C_RESET}"

if [ ! -d "backend" ] || [ ! -f "backend/manage.py" ]; then
    echo -e "${C_RED}❌ ERROR: Backend directory or manage.py not found!${C_RESET}"
    echo "Please make sure you're running this from the project root and the backend is set up."
    exit 1
fi

if [ ! -d "frontend/lynapp-react" ] || [ ! -f "frontend/lynapp-react/package.json" ]; then
    echo -e "${C_RED}❌ ERROR: Frontend directory or package.json not found!${C_RESET}"
    echo "Please make sure you're running this from the project root and the frontend is set up."
    exit 1
fi

echo -e "${C_GREEN}✅ Project structure is valid.${C_RESET}"
echo

# ============================================================================
# PORT AVAILABILITY CHECK
# ============================================================================

# Function to check if a port is in use
function is_port_in_use() {
    lsof -iTCP:$1 -sTCP:LISTEN -t >/dev/null
}

echo -e "${C_CYAN}Checking port availability...${C_RESET}"

if is_port_in_use 8000; then
    echo -e "${C_RED}❌ ERROR: Port 8000 is already in use by another service.${C_RESET}"
    echo "Please stop the conflicting service before starting this app."
    exit 1
fi

if is_port_in_use 5173; then
    echo -e "${C_RED}❌ ERROR: Port 5173 is already in use by another service.${C_RESET}"
    echo "Please stop the conflicting service before starting this app."
    exit 1
fi

echo -e "${C_GREEN}✅ Ports 8000 and 5173 are available.${C_RESET}"
echo

# ============================================================================
# SERVICE STARTUP FUNCTIONS
# ============================================================================

# Function to intelligently wait for a service to be ready
function smart_wait() {
    local service_name=$1
    local port=$2
    local max_wait=$3
    local wait_count=0

    echo -n -e "${C_CYAN}Waiting for $service_name to initialize on port $port...${C_RESET}"
    while ! is_port_in_use $port; do
        if [ $wait_count -ge $max_wait ]; then
            echo -e "\n${C_RED}⚠️  $service_name taking longer than expected to start.${C_RESET}"
            echo -e "${C_YELLOW}Check the log file for errors.${C_RESET}"
            return 1
        fi
        sleep 1
        ((wait_count++))
        echo -n "."
    done
    echo -e "\n${C_GREEN}✅ $service_name is ready! (took ${wait_count}s)${C_RESET}"
    return 0
}


# Function to start the Django backend
function start_django() {
    echo -e "${C_CYAN}[1/2] Starting Django backend service (using virtualenv)...${C_RESET}"
    (
        cd backend
        # Start server using the python from venv and redirect output to log file
        nohup ../$VENV_PYTHON manage.py runserver > ../django.log 2>&1 &
        # Overwrite PID file with Django's PID
        echo $! > "$PID_FILE"
    )
    smart_wait "Django" 8000 20
    return $? # Propagate status from smart_wait
}

# Function to start the React frontend
function start_react() {
    echo -e "${C_CYAN}[2/2] Starting React frontend service...${C_RESET}"
    local react_pid

    # --- First Attempt ---
    (
        cd frontend/lynapp-react
        nohup npm run dev > ../../react.log 2>&1 &
        react_pid=$!
        # Append React's PID to the file. It might be a failed process, but we need it to kill it.
        echo $react_pid >> "$PID_FILE"
    )

    if smart_wait "React" 5173 30; then
        # Success on first try
        return 0
    fi

    # --- Failure Handling & Second Attempt ---
    echo -e "\n${C_YELLOW}React server failed to become available. Checking for common issues...${C_RESET}"
    sleep 1 # Allow log file to flush

    # Check log for errors indicating missing dependencies (e.g., "Cannot find module", "vite: command not found")
    if grep -q -E "Cannot find module|command not found" react.log; then
        echo -e "${C_YELLOW}Potential dependency issue detected. Attempting automatic recovery...${C_RESET}"
        echo -e "${C_CYAN}Running 'npm install'. This may take a moment...${C_RESET}"

        # Clean up the failed process
        kill $react_pid >/dev/null 2>&1
        # Remove the last PID (the failed one) from the file. The -i '' is for macOS sed.
        sed -i '' '$d' "$PID_FILE"

        # Run npm install. Output is shown to the user for transparency.
        (cd frontend/lynapp-react && npm install)

        echo -e "${C_CYAN}Retrying 'npm run dev'...${C_RESET}"
        (
            cd frontend/lynapp-react
            nohup npm run dev > ../../react.log 2>&1 &
            react_pid=$!
            echo $react_pid >> "$PID_FILE"
        )

        # Wait again, maybe a bit longer as installs can be slow
        if smart_wait "React" 5173 45; then
            echo -e "${C_GREEN}✅ Recovery successful. React is now running.${C_RESET}"
            return 0
        else
            echo -e "\n${C_RED}❌ Recovery failed. React still did not start after 'npm install'. Please check 'react.log'.${C_RESET}"
            return 1
        fi
    else
        echo -e "\n${C_RED}❌ React failed to start for a different reason. Please check 'react.log'.${C_RESET}"
        return 1
    fi
}

# ============================================================================
# SERVICE STATUS FUNCTIONS
# ============================================================================
DJANGO_PID_VAL=""
REACT_PID_VAL=""
DJANGO_STATUS="STOPPED"
REACT_STATUS="STOPPED"

function update_pids() {
    if [ -f "$PID_FILE" ]; then
        DJANGO_PID_VAL=$(sed -n '1p' "$PID_FILE")
        REACT_PID_VAL=$(sed -n '2p' "$PID_FILE")
    fi
}

function check_service_status() {
    update_pids
    # Check Django
    if is_port_in_use 8000 && ps -p $DJANGO_PID_VAL > /dev/null; then
        DJANGO_STATUS="${C_GREEN}✅ RUNNING${C_RESET}"
    else
        DJANGO_STATUS="${C_RED}❌ STOPPED${C_RESET}"
    fi
    # Check React
    if is_port_in_use 5173 && ps -p $REACT_PID_VAL > /dev/null; then
        REACT_STATUS="${C_GREEN}✅ RUNNING${C_RESET}"
    else
        REACT_STATUS="${C_RED}❌ STOPPED${C_RESET}"
    fi
}

# ============================================================================
# MENU AND USER ACTIONS
# ============================================================================

function open_urls() {
    echo -e "${C_CYAN}Opening URLs in default browser...${C_RESET}"
    open http://localhost:5173
    open http://localhost:8000
}

function main_menu() {
    # Clear screen for clean presentation
    clear
    
    # Check status before displaying menu
    check_service_status

    echo -e "${C_BLUE}================================================================${C_RESET}"
    echo -e "${C_WHITE}           🤖 LYN Housing AI - Project Control Panel ⚙️${C_RESET}"
    echo -e "${C_BLUE}================================================================${C_RESET}"
    echo
    echo -e "   ${C_WHITE}SERVICE STATUS${C_RESET}"
    echo -e "   ${C_BLUE}────────────────────────────────────────────────${C_RESET}"
    echo -e "   🐍 Django Backend:  $DJANGO_STATUS on port 8000"
    echo -e "                        (http://localhost:8000)"
    echo -e "   ⚛️  React Frontend:  $REACT_STATUS on port 5173"
    echo -e "                        (http://localhost:5173)"
    echo
    echo -e "   ${C_WHITE}MENU${C_RESET}"
    echo -e "   ${C_BLUE}────────────────────────────────────────────────${C_RESET}"
    echo -e "   ${C_CYAN}[1] Open URLs in browser${C_RESET}"
    echo -e "   ${C_CYAN}[0] Quit (stops all services)${C_RESET}"
    echo
    echo -e "${C_BLUE}================================================================${C_RESET}"
    echo -e "${C_CYAN}Logs are available in 'django.log' and 'react.log'${C_RESET}"
    echo -e "${C_CYAN}Press Ctrl+C to shut down all services gracefully.${C_RESET}"
}

# ============================================================================
# APPLICATION STARTUP AND MAIN LOOP
# ============================================================================

echo -e "${C_CYAN}Starting application...${C_RESET}"
if ! start_django; then
    echo -e "${C_RED}❌ Critical error starting Django. Please check logs. Aborting.${C_RESET}"
    exit 1
fi
if ! start_react; then
    echo -e "${C_RED}❌ Critical error starting React. Please check logs. Aborting.${C_RESET}"
    exit 1
fi

while true; do
    main_menu
    read -p "Choose an option (0-1): " choice
    echo

    case $choice in
        1)
            open_urls
            read -p "Press Enter to continue..."
            ;;
        0)
            echo -e "${C_CYAN}Quitting. Services will be shut down by the cleanup process.${C_RESET}"
            exit 0
            ;;
        *)
            echo -e "${C_RED}❌ Invalid option. Please try again.${C_RESET}"
            sleep 2
            ;;
    esac
done