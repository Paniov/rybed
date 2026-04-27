class BibleReadingApp {
    constructor() {
        this.readingData = null;
        this.currentDate = null;
        this.init();
    }

    async init() {
        try {
            // Load the reading plan file
            await this.loadReadingPlan();
            // Always get fresh current date
            this.setCurrentDate(new Date());
            this.updateDisplay();
            this.attachEventListeners();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load Bible reading plan');
        }
    }

    async loadReadingPlan() {
        const response = await fetch('Bibile Reading Plan of the year for AI Context');
        const text = await response.text();
        this.readingData = this.parseReadingPlan(text);
    }

    parseReadingPlan(text) {
        const lines = text.split('\n');
        const data = {
            nonLeap: { nt: {}, ot: {} },
            leap: { nt: {}, ot: {} }
        };

        let currentSection = null;
        let isLeapYear = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.includes('Non-Leap Year New Testament')) {
                currentSection = 'nt';
                isLeapYear = false;
            } else if (line.includes('Leap Year New Testament')) {
                currentSection = 'nt';
                isLeapYear = true;
            } else if (line.includes('Non-leap Year Old Testament')) {
                currentSection = 'ot';
                isLeapYear = false;
            } else if (line.includes('Leap Year Old Testament')) {
                currentSection = 'ot';
                isLeapYear = true;
            } else if (line && !line.startsWith('Based on') && !line.includes('Daily Reading Plan') && line.includes('—')) {
                // Parse reading entries
                const parts = line.split('—');
                if (parts.length === 2) {
                    const dateStr = parts[0].trim();
                    const reading = parts[1].trim();

                    if (currentSection && isLeapYear !== null) {
                        const yearType = isLeapYear ? 'leap' : 'nonLeap';
                        data[yearType][currentSection][dateStr] = reading;
                    }
                }
            }
        }

        return data;
    }

    setCurrentDate(date) {
        this.currentDate = new Date(date);
        // Normalize to midnight to avoid timezone issues
        this.currentDate.setHours(0, 0, 0, 0);
    }

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getDateKey(date) {
        const month = date.toLocaleString('en-US', { month: 'long' });
        const day = date.getDate();
        return `${month} ${day}`;
    }

    getReading(date, testament) {
        const year = date.getFullYear();
        const yearType = this.isLeapYear(year) ? 'leap' : 'nonLeap';
        const dateKey = this.getDateKey(date);

        try {
            return this.readingData[yearType][testament][dateKey] || 'Reading not found';
        } catch (error) {
            console.error('Error getting reading:', error);
            return 'Reading not found';
        }
    }

    formatDateDisplay(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    updateDisplay() {
        // Update date display
        const dateStr = this.formatDateDisplay(this.currentDate);
        document.getElementById('dateDisplay').textContent = dateStr;

        // Get and display readings
        const otReading = this.getReading(this.currentDate, 'ot');
        const ntReading = this.getReading(this.currentDate, 'nt');

        document.getElementById('otReading').textContent = otReading;
        document.getElementById('ntReading').textContent = ntReading;
    }

    previousDay() {
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() - 1);
        this.setCurrentDate(newDate);
        this.updateDisplay();
    }

    nextDay() {
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + 1);
        this.setCurrentDate(newDate);
        this.updateDisplay();
    }

    attachEventListeners() {
        document.getElementById('prevBtn').addEventListener('click', () => this.previousDay());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextDay());
    }

    showError(message) {
        document.getElementById('otReading').textContent = message;
        document.getElementById('ntReading').textContent = message;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BibleReadingApp();
});
