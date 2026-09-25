import sqlite3
import os
from werkzeug.security import generate_password_hash

DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "women_safety.db")

def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user', -- 'user' or 'admin'
        avatar TEXT,
        medical_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 2. Emergency Contacts Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS emergency_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        relationship TEXT,
        email TEXT,
        is_primary INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # 3. Incident Reports Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS incident_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        reporter_name TEXT,
        incident_type TEXT NOT NULL,
        incident_date TEXT NOT NULL,
        incident_time TEXT NOT NULL,
        location TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        severity TEXT DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Critical'
        description TEXT NOT NULL,
        evidence_image TEXT,
        is_anonymous INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Under Review', -- 'Submitted', 'Under Review', 'Verified', 'Resolved'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    );
    """)

    # 4. SOS Alerts Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sos_alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_name TEXT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        address TEXT,
        contacts_alerted INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Active', -- 'Active', 'Resolved', 'False Alarm'
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    );
    """)

    # 5. Crime Analytics Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS crime_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        area_name TEXT NOT NULL,
        crime_type TEXT NOT NULL,
        frequency INTEGER DEFAULT 1,
        risk_level TEXT DEFAULT 'Medium', -- 'Low', 'Medium', 'High', 'Critical'
        time_slot TEXT, -- 'Morning', 'Afternoon', 'Evening', 'Night', 'Late Night'
        day_of_week TEXT,
        year INTEGER DEFAULT 2025,
        latitude REAL,
        longitude REAL
    );
    """)

    # 6. Safety Tips Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS safety_tips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        read_time TEXT DEFAULT '3 min',
        icon TEXT DEFAULT 'ShieldCheck',
        is_featured INTEGER DEFAULT 0
    );
    """)

    # 7. Emergency Resources Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS emergency_resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL, -- 'Police Station', 'Hospital', 'Women Helpline', 'Pink Booth', 'NGO Shelter'
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        is_24_7 INTEGER DEFAULT 1
    );
    """)

    conn.commit()
    seed_initial_data(conn)
    conn.close()

def seed_initial_data(conn):
    cursor = conn.cursor()

    # Check if users already seeded
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        admin_pass = generate_password_hash("admin123")
        user_pass = generate_password_hash("password123")

        cursor.execute("""
        INSERT INTO users (fullname, email, phone, password, role, avatar, medical_info)
        VALUES 
        ('Safety Operations Admin', 'admin@womensafety.org', '+18005550199', ?, 'admin', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'Blood Type: O+, No known allergies'),
        ('Sarah Jenkins', 'sarah@example.com', '+18005550143', ?, 'user', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Blood Type: A+, Asthmatic - Inhaler in purse')
        """, (admin_pass, user_pass))

        cursor.execute("""
        INSERT INTO emergency_contacts (user_id, name, phone, relationship, email, is_primary)
        VALUES
        (2, 'Eleanor Jenkins', '+1 (555) 234-5678', 'Mother', 'eleanor.j@example.com', 1),
        (2, 'Marcus Vance', '+1 (555) 876-5432', 'Brother / Guardian', 'marcus.v@example.com', 0),
        (2, 'Maya Lin', '+1 (555) 345-6789', 'Roommate', 'maya.lin@example.com', 0)
        """)

    # Seed Crime Data
    cursor.execute("SELECT COUNT(*) FROM crime_data WHERE city = 'Karur'")
    if cursor.fetchone()[0] == 0:
        crimes = [
            # Karur & Tamil Nadu
            ('Karur', 'Karur Central Bus Stand & Market', 'Eve Teasing', 14, 'Medium', 'Evening', 'Saturday', 2025, 10.9590, 78.0780),
            ('Karur', 'Thanthoni Malai College Road', 'Poor Lighting', 10, 'Low', 'Night', 'Wednesday', 2025, 10.9320, 78.0850),
            ('Karur', 'Vengamedu Railway Crossing', 'Stalking Risk', 16, 'Medium', 'Late Night', 'Friday', 2025, 10.9750, 78.0710),
            ('Karur', 'Pasupatheeswarar Temple Outer Ring', 'Crowd Misconduct', 8, 'Low', 'Evening', 'Sunday', 2025, 10.9610, 78.0750),
            
            # Chennai
            ('Chennai', 'T. Nagar Ranganathan Street', 'Pickpocketing / Crowds', 45, 'High', 'Evening', 'Sunday', 2025, 13.0418, 80.2341),
            ('Chennai', 'Marina Beach Promenade South', 'Harassment', 28, 'Medium', 'Night', 'Saturday', 2025, 13.0500, 80.2824),
            ('Chennai', 'Guindy Industrial Estate Transit', 'Poor Lighting', 32, 'High', 'Late Night', 'Thursday', 2025, 13.0067, 80.2025),

            # Coimbatore
            ('Coimbatore', 'Gandhipuram Bus Terminus', 'Harassment', 30, 'High', 'Night', 'Friday', 2025, 11.0180, 76.9680),
            ('Coimbatore', 'RS Puram DB Road', 'Eve Teasing', 12, 'Low', 'Evening', 'Saturday', 2025, 11.0080, 76.9450),

            # Madurai
            ('Madurai', 'Periyar Bus Stand', 'Crowd Harassment', 35, 'High', 'Evening', 'Monday', 2025, 9.9160, 78.1130),
            ('Madurai', 'Mattuthavani Integrated Bus Terminal', 'Theft', 26, 'Medium', 'Late Night', 'Friday', 2025, 9.9450, 78.1580),

            # Delhi
            ('Delhi', 'Connaught Place & Metro Station', 'Harassment', 42, 'High', 'Late Night', 'Friday', 2025, 28.6315, 77.2167),
            ('Delhi', 'Hauz Khas Village', 'Stalking', 28, 'Medium', 'Night', 'Saturday', 2025, 28.5494, 77.2001),
            ('Delhi', 'Rohini Sector 18', 'Theft / Snatching', 65, 'High', 'Evening', 'Wednesday', 2025, 28.7383, 77.1122),
            ('Delhi', 'Dwarka Mor Underpass', 'Eve Teasing', 38, 'Critical', 'Late Night', 'Thursday', 2025, 28.6190, 77.0329),

            # Mumbai
            ('Mumbai', 'Andheri West Station East Exit', 'Stalking', 34, 'High', 'Night', 'Monday', 2025, 19.1197, 72.8464),
            ('Mumbai', 'Bandra Bandstand Promenade', 'Harassment', 22, 'Medium', 'Late Night', 'Saturday', 2025, 19.0434, 72.8194),
            ('Mumbai', 'Dadar Railway Junction', 'Crowd Misconduct', 58, 'High', 'Morning', 'Wednesday', 2025, 19.0178, 72.8478),

            # Bengaluru
            ('Bengaluru', 'Koramangala 5th Block', 'Eve Teasing', 25, 'Medium', 'Late Night', 'Saturday', 2025, 12.9352, 77.6245),
            ('Bengaluru', 'Indiranagar 100ft Road', 'Stalking', 18, 'Medium', 'Night', 'Friday', 2025, 12.9784, 77.6408),
            ('Bengaluru', 'Majestic Bus Stand', 'Harassment', 62, 'Critical', 'Late Night', 'Tuesday', 2025, 12.9767, 77.5713),

            # New York
            ('New York', 'Times Square Subway Station', 'Harassment', 55, 'High', 'Late Night', 'Friday', 2025, 40.7580, -73.9855),
            ('New York', 'Central Park North Outer Walkway', 'Stalking', 29, 'Critical', 'Night', 'Saturday', 2025, 40.7960, -73.9540)
        ]
        cursor.executemany("""
        INSERT INTO crime_data (city, area_name, crime_type, frequency, risk_level, time_slot, day_of_week, year, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, crimes)

    # Check if Emergency Resources seeded for Karur
    cursor.execute("SELECT COUNT(*) FROM emergency_resources WHERE city = 'Karur'")
    if cursor.fetchone()[0] == 0:
        resources = [
            # National / Helplines
            ('National Emergency Response Service', 'Women Helpline', '112', 'Universal All-India / National Emergency Helpline', 'All Cities', 28.6139, 77.2090, 1),
            ('Women in Distress Helpline', 'Women Helpline', '1091', '24/7 Dedicated Women Police Assistance Helpline', 'All Cities', 28.6139, 77.2090, 1),
            ('Tamil Nadu Women Helpline (181)', 'Women Helpline', '181', '24/7 State Women Crisis & Safety Helpline', 'All Cities', 13.0827, 80.2707, 1),
            ('National Commission for Women (NCW)', 'Women Helpline', '7827170170', 'NCW 24/7 Helpline for Domestic Violence & Harassment', 'All Cities', 28.6139, 77.2090, 1),
            ('Cyber Crime & Online Safety Cell', 'Women Helpline', '1930', 'Cyber Crime & Online Harassment Reporting Cell', 'All Cities', 28.6139, 77.2090, 1),
            ('Ambulance / Medical Emergency', 'Hospital', '102', 'National Emergency Ambulance Service', 'All Cities', 28.6139, 77.2090, 1),

            # Karur, Tamil Nadu Local Resources
            ('Karur All Women Police Station (AWPS)', 'Police Station', '+91 4324 260100', 'Jawahar Bazaar, Near Central Bus Stand, Karur - 639001', 'Karur', 10.9605, 78.0772, 1),
            ('Karur Town Police Station', 'Police Station', '+91 4324 260300', 'Kovai Main Road, Karur', 'Karur', 10.9630, 78.0810, 1),
            ('Karur District Govt Medical College & Hospital', 'Hospital', '+91 4324 220000', 'Gandhigramam, Karur - 639004', 'Karur', 10.9450, 78.0620, 1),
            ('Amaravathi 24/7 Emergency & Trauma Care', 'Hospital', '+91 4324 240400', 'Thanthoni Malai Road, Karur', 'Karur', 10.9320, 78.0850, 1),
            ('Karur Pink Booth Women Safe Kiosk', 'Pink Booth', '1091', 'Central Bus Stand Concourse, Karur', 'Karur', 10.9590, 78.0780, 1),

            # Chennai, Tamil Nadu
            ('Thousand Lights All Women Police Station', 'Police Station', '+91 44 2829 3666', 'Greams Rd, Thousand Lights, Chennai', 'Chennai', 13.0604, 80.2496, 1),
            ('Rajiv Gandhi Govt General Hospital Trauma Care', 'Hospital', '+91 44 2530 5000', 'EVR Periyar Salai, Park Town, Chennai', 'Chennai', 13.0815, 80.2780, 1),

            # Coimbatore, Tamil Nadu
            ('Coimbatore Central All Women Police Station', 'Police Station', '+91 422 230 0970', 'State Bank Rd, Gopalapuram, Coimbatore', 'Coimbatore', 11.0016, 76.9629, 1),
            ('Coimbatore Medical College Hospital (CMCH)', 'Hospital', '+91 422 230 1393', 'Trichy Rd, Coimbatore', 'Coimbatore', 11.0020, 76.9750, 1),

            # Madurai, Tamil Nadu
            ('Madurai Town All Women Police Station', 'Police Station', '+91 452 234 1100', 'South Veli St, Madurai', 'Madurai', 9.9160, 78.1180, 1),
            ('Government Rajaji Hospital & Trauma Care', 'Hospital', '+91 452 253 2535', 'Panagal Rd, Shenoy Nagar, Madurai', 'Madurai', 9.9320, 78.1350, 1),

            # Tiruchirappalli (Trichy)
            ('Trichy Fort All Women Police Station', 'Police Station', '+91 431 270 4100', 'Main Guard Gate, Fort, Trichy', 'Tiruchirappalli', 10.8280, 78.6960, 1),
            ('Mahatma Gandhi Memorial Govt Hospital', 'Hospital', '+91 431 241 5555', 'Collector Office Rd, Cantonment, Trichy', 'Tiruchirappalli', 10.8060, 78.6850, 1),

            # Bengaluru
            ('Indiranagar Women Police Station', 'Police Station', '+91 80 2294 2533', '100 Feet Rd, Indiranagar, Bengaluru', 'Bengaluru', 12.9719, 77.6412, 1),
            ('Manipal Hospital 24/7 Trauma Care', 'Hospital', '+91 80 2502 4444', '98, HAL Old Airport Rd, Bengaluru', 'Bengaluru', 12.9583, 77.6483, 1),

            # Delhi
            ('Parliament Street Police Station & Women Cell', 'Police Station', '+91 11 2336 1100', 'Parliament Street, New Delhi', 'Delhi', 28.6258, 77.2144, 1),
            ('AIIMS Emergency & Trauma Centre', 'Hospital', '+91 11 2658 8500', 'Ansari Nagar, New Delhi', 'Delhi', 28.5672, 77.2100, 1),

            # Mumbai
            ('Bandra Police Station', 'Police Station', '+91 22 2642 2002', 'Hill Rd, Bandra West, Mumbai', 'Mumbai', 19.0544, 72.8402, 1),
            ('Lilavati Hospital and Research Centre', 'Hospital', '+91 22 2675 1000', 'Bandra Reclamation, Mumbai', 'Mumbai', 19.0512, 72.8290, 1)
        ]
        cursor.executemany("""
        INSERT INTO emergency_resources (name, type, phone, address, city, latitude, longitude, is_24_7)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, resources)

    conn.commit()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DATABASE_PATH)
