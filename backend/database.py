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
        # Default admin & demo user
        admin_pass = generate_password_hash("admin123")
        user_pass = generate_password_hash("password123")

        cursor.execute("""
        INSERT INTO users (fullname, email, phone, password, role, avatar, medical_info)
        VALUES 
        ('Safety Operations Admin', 'admin@womensafety.org', '+18005550199', ?, 'admin', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'Blood Type: O+, No known allergies'),
        ('Sarah Jenkins', 'sarah@example.com', '+18005550143', ?, 'user', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Blood Type: A+, Asthmatic - Inhaler in purse')
        """, (admin_pass, user_pass))

        # Seed Emergency Contacts for Sarah (id=2)
        cursor.execute("""
        INSERT INTO emergency_contacts (user_id, name, phone, relationship, email, is_primary)
        VALUES
        (2, 'Eleanor Jenkins', '+1 (555) 234-5678', 'Mother', 'eleanor.j@example.com', 1),
        (2, 'Marcus Vance', '+1 (555) 876-5432', 'Brother / Guardian', 'marcus.v@example.com', 0),
        (2, 'Maya Lin', '+1 (555) 345-6789', 'Roommate', 'maya.lin@example.com', 0)
        """)

    # Check if Crime Data seeded
    cursor.execute("SELECT COUNT(*) FROM crime_data")
    if cursor.fetchone()[0] == 0:
        crimes = [
            # Delhi
            ('Delhi', 'Connaught Place & Metro Station', 'Harassment', 42, 'High', 'Late Night', 'Friday', 2025, 28.6315, 77.2167),
            ('Delhi', 'Hauz Khas Village', 'Stalking', 28, 'Medium', 'Night', 'Saturday', 2025, 28.5494, 77.2001),
            ('Delhi', 'Rohini Sector 18', 'Theft / Snatching', 65, 'High', 'Evening', 'Wednesday', 2025, 28.7383, 77.1122),
            ('Delhi', 'Dwarka Mor Underpass', 'Eve Teasing', 38, 'Critical', 'Late Night', 'Thursday', 2025, 28.6190, 77.0329),
            ('Delhi', 'Saket District Centre', 'Verbal Abuse', 19, 'Low', 'Afternoon', 'Sunday', 2025, 28.5245, 77.2177),
            ('Delhi', 'Lajpat Nagar Market', 'Pickpocketing', 51, 'Medium', 'Evening', 'Saturday', 2025, 28.5700, 77.2435),

            # Mumbai
            ('Mumbai', 'Andheri West Station East Exit', 'Stalking', 34, 'High', 'Night', 'Monday', 2025, 19.1197, 72.8464),
            ('Mumbai', 'Bandra Bandstand Promenade', 'Harassment', 22, 'Medium', 'Late Night', 'Saturday', 2025, 19.0434, 72.8194),
            ('Mumbai', 'Dadar Railway Junction', 'Crowd Misconduct', 58, 'High', 'Morning', 'Wednesday', 2025, 19.0178, 72.8478),
            ('Mumbai', 'Kurla West Bus Terminus', 'Theft', 44, 'Critical', 'Night', 'Friday', 2025, 19.0657, 72.8794),
            ('Mumbai', 'Colaba Causeway', 'Eve Teasing', 15, 'Low', 'Afternoon', 'Tuesday', 2025, 18.9218, 72.8331),

            # Bengaluru
            ('Bengaluru', 'Koramangala 5th Block', 'Eve Teasing', 25, 'Medium', 'Late Night', 'Saturday', 2025, 12.9352, 77.6245),
            ('Bengaluru', 'Indiranagar 100ft Road', 'Stalking', 18, 'Medium', 'Night', 'Friday', 2025, 12.9784, 77.6408),
            ('Bengaluru', 'Majestic Bus Stand', 'Harassment', 62, 'Critical', 'Late Night', 'Tuesday', 2025, 12.9767, 77.5713),
            ('Bengaluru', 'Electronic City Flyover Exit', 'Assault Risk', 31, 'High', 'Late Night', 'Thursday', 2025, 12.8452, 77.6602),
            ('Bengaluru', 'Whitefield Outer Ring Road', 'Vehicle Tampering', 20, 'Low', 'Evening', 'Monday', 2025, 12.9698, 77.7500),

            # New York / Global
            ('New York', 'Times Square Subway Station', 'Harassment', 55, 'High', 'Late Night', 'Friday', 2025, 40.7580, -73.9855),
            ('New York', 'Central Park North Outer Walkway', 'Stalking', 29, 'Critical', 'Night', 'Saturday', 2025, 40.7960, -73.9540),
            ('New York', 'Penn Station Concourse', 'Verbal Abuse', 41, 'Medium', 'Evening', 'Tuesday', 2025, 40.7506, -73.9935),
            ('New York', 'Bushwick Alleyways', 'Assault Risk', 36, 'High', 'Late Night', 'Sunday', 2025, 40.6944, -73.9213)
        ]
        cursor.executemany("""
        INSERT INTO crime_data (city, area_name, crime_type, frequency, risk_level, time_slot, day_of_week, year, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, crimes)

    # Check if Sample Incident Reports seeded
    cursor.execute("SELECT COUNT(*) FROM incident_reports")
    if cursor.fetchone()[0] == 0:
        incidents = [
            (2, 'Sarah Jenkins', 'Stalking / Following', '2026-08-20', '22:15', 'Near Indiranagar Metro Station Gate 2', 12.9784, 77.6408, 'High', 'A person in a black hoodie was persistently following me from the ticket counter to the cab stand for over 15 minutes. Notified metro security guard.', None, 0, 'Verified'),
            (None, 'Anonymous Reporter', 'Verbal Harassment', '2026-08-22', '19:40', 'Central Bus Depot Platform 4', 12.9767, 77.5713, 'Medium', 'Group of youths passing inappropriate remarks near the ladies waiting lounge. Security was alerted and disbursed them.', None, 1, 'Resolved'),
            (2, 'Sarah Jenkins', 'Poor Lighting / Dark Alley Hazard', '2026-08-25', '21:00', '14th Main Road 4th Cross, Koramangala', 12.9352, 77.6245, 'Medium', 'Street lights have been completely broken for the last 10 days on this stretch creating a high hazard zone for women walking from transit.', None, 0, 'Under Review')
        ]
        cursor.executemany("""
        INSERT INTO incident_reports (user_id, reporter_name, incident_type, incident_date, incident_time, location, latitude, longitude, severity, description, evidence_image, is_anonymous, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, incidents)

    # Check if Safety Tips seeded
    cursor.execute("SELECT COUNT(*) FROM safety_tips")
    if cursor.fetchone()[0] == 0:
        tips = [
            ('Travel Safety', 'Late-Night Ride Share Verification Protocol', 'Essential checklist before boarding any taxi, cab, or ride-share vehicle at night.', 
             '1. Always verify the driver name, car make, and license plate with your app before stepping in.\n2. Ask the driver "Who are you picking up?" instead of giving your name.\n3. Share your live trip status with at least 2 trusted emergency contacts.\n4. Check child-lock status on back doors before the ride begins.\n5. Keep emergency SOS speed-dial active on your lock screen.', '4 min', 'Car', 1),
            
            ('Online & Cyber Safety', 'Defending Against Cyber Stalking and Doxxing', 'How to safeguard your digital footprint, location tags, and private data.',
             '1. Turn off location permissions for social media apps and photo EXIF metadata.\n2. Never post real-time stories showing current exact locations.\n3. Enable 2-Factor Authentication (2FA) on all messaging and email platforms.\n4. Routinely audit connected devices in account security settings.\n5. If receiving threatening messages, take dated screenshots before blocking.', '5 min', 'ShieldCheck', 1),

            ('Workplace Safety', 'Navigating Workplace Harassment and Documentation', 'Protocols for establishing evidence, legal rights, and reporting escalation.',
             '1. Keep a private offline log with dates, times, witnesses, and exact words or actions.\n2. Save relevant emails, chats, or voicemails to a personal secure drive.\n3. Understand internal POSH (Prevention of Sexual Harassment) / HR escalation channels.\n4. Seek confidential counseling through verified women workplace support networks.', '6 min', 'Briefcase', 0),

            ('College & Campus Safety', 'Campus Navigation & Peer Escort Guidelines', 'Staying vigilant across university premises, dorms, and transit paths.',
             '1. Memorize location of blue light emergency poles and security guard posts.\n2. Use the buddy system when returning from late study labs or library sessions.\n3. Keep campus emergency dispatcher on fast speed-dial.\n4. Never leave drinks or bags unattended at student gatherings.', '3 min', 'GraduationCap', 0),

            ('Public Places & Night Safety', 'Situational Awareness and De-escalation', 'Practical strategies for recognizing threats early in crowded or deserted public places.',
             '1. Avoid wearing noise-canceling headphones in both ears while walking alone.\n2. Walk with confidence, head up, and maintain a 360-degree awareness perimeter.\n3. If you suspect you are being followed, cross the street, change pace, or enter an open store.\n4. Trust your instincts immediately; never worry about being "polite" when safety is at stake.', '4 min', 'Eye', 1),

            ('Physical Self-Defense', 'High-Impact Vulnerable Target Strikes', 'Key physical defense techniques designed to disable an attacker quickly to escape.',
             '1. Target primary vulnerable points: Eyes, Nose bridge, Throat/Windpipe, Groin, and Shin/Knee.\n2. The Palm-Heel Strike: Drive heel of palm upward under the attacker’s nose with full body momentum.\n3. The Throat Jab / Clavicle Strike: Stun airway to trigger involuntary coughing and release.\n4. The Ear Slap: Cupped hands clapped forcefully over both ears causes sudden disorientation.\n5. Immediate Action: Strike once or twice and run toward light and people screaming "HELP - CALL POLICE".', '5 min', 'Zap', 1)
        ]
        cursor.executemany("""
        INSERT INTO safety_tips (category, title, description, content, read_time, icon, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, tips)

    # Check if Emergency Resources seeded
    cursor.execute("SELECT COUNT(*) FROM emergency_resources")
    if cursor.fetchone()[0] == 0:
        resources = [
            # National / Helplines
            ('National Emergency Response Service', 'Women Helpline', '112', 'Universal All-India / National Emergency Helpline', 'All Cities', 28.6139, 77.2090, 1),
            ('Women in Distress Helpline', 'Women Helpline', '1091', '24/7 Dedicated Women Police Assistance Helpline', 'All Cities', 28.6139, 77.2090, 1),
            ('National Commission for Women (NCW)', 'Women Helpline', '7827170170', 'NCW 24/7 Helpline for Domestic Violence & Harassment', 'All Cities', 28.6139, 77.2090, 1),
            ('Women Safety & Cyber Crime Helpline', 'Women Helpline', '1930', 'Cyber Crime & Online Harassment Reporting Cell', 'All Cities', 28.6139, 77.2090, 1),
            ('Ambulance / Medical Emergency', 'Hospital', '102', 'National Emergency Ambulance Service', 'All Cities', 28.6139, 77.2090, 1),

            # Local Bengaluru
            ('Indiranagar Women Police Station', 'Police Station', '+91 80 2294 2533', '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru', 'Bengaluru', 12.9719, 77.6412, 1),
            ('Koramangala Police Station', 'Police Station', '+91 80 2294 2565', '80 Feet Rd, 6th Block, Koramangala, Bengaluru', 'Bengaluru', 12.9344, 77.6192, 1),
            ('Manipal Hospital 24/7 Trauma Care', 'Hospital', '+91 80 2502 4444', '98, HAL Old Airport Rd, Kodihalli, Bengaluru', 'Bengaluru', 12.9583, 77.6483, 1),
            ('St. Johns Medical College Hospital', 'Hospital', '+91 80 2206 5000', 'Sarjapur Main Rd, John Nagar, Koramangala, Bengaluru', 'Bengaluru', 12.9312, 77.6180, 1),
            ('Pink Booth Safe Zone - Metro Station', 'Pink Booth', '1091', 'MG Road Metro Station Concourse, Bengaluru', 'Bengaluru', 12.9756, 77.6066, 1),

            # Local Delhi
            ('Parliament Street Police Station & Women Cell', 'Police Station', '+91 11 2336 1100', 'Parliament Street, Connaught Place, New Delhi', 'Delhi', 28.6258, 77.2144, 1),
            ('Hauz Khas Police Station', 'Police Station', '+91 11 2686 2110', 'Hauz Khas, New Delhi', 'Delhi', 28.5494, 77.2001, 1),
            ('AIIMS Emergency & Trauma Centre', 'Hospital', '+91 11 2658 8500', 'Sri Aurobindo Marg, Ansari Nagar, New Delhi', 'Delhi', 28.5672, 77.2100, 1),
            ('Safdarjung Hospital Emergency Care', 'Hospital', '+91 11 2616 5060', 'Ring Road, Opposite AIIMS, New Delhi', 'Delhi', 28.5684, 77.2056, 1),

            # Local Mumbai
            ('Bandra Police Station', 'Police Station', '+91 22 2642 2002', 'Hill Rd, Bandra West, Mumbai', 'Mumbai', 19.0544, 72.8402, 1),
            ('Lilavati Hospital and Research Centre', 'Hospital', '+91 22 2675 1000', 'A-791, Bandra Reclamation, Bandra West, Mumbai', 'Mumbai', 19.0512, 72.8290, 1)
        ]
        cursor.executemany("""
        INSERT INTO emergency_resources (name, type, phone, address, city, latitude, longitude, is_24_7)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, resources)

    conn.commit()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DATABASE_PATH)
