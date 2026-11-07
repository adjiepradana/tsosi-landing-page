-- Migration: 20261107000000_init_tsosi_schema.sql
-- Personal Soul Blueprint™ Assessment Database Schema
-- Brand: The Soul of Speaking Indonesia

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Participants
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email);
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at DESC);

-- 2. Assessment Patterns
CREATE TABLE IF NOT EXISTS assessment_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pattern_code TEXT UNIQUE NOT NULL,
    pattern_name TEXT NOT NULL,
    indonesian_title TEXT NOT NULL,
    definition TEXT NOT NULL,
    description TEXT NOT NULL,
    action_advice TEXT NOT NULL,
    sort_order INTEGER NOT NULL
);

-- 3. Assessment Items (27 Statements)
CREATE TABLE IF NOT EXISTS assessment_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_number INTEGER NOT NULL UNIQUE,
    question_code TEXT UNIQUE NOT NULL,
    question_text TEXT NOT NULL,
    pattern_code TEXT NOT NULL REFERENCES assessment_patterns(pattern_code),
    sort_order INTEGER NOT NULL,
    assessment_version TEXT NOT NULL DEFAULT '1.0.0'
);

CREATE INDEX IF NOT EXISTS idx_items_pattern ON assessment_items(pattern_code);

-- 4. Assessment Submissions
CREATE TABLE IF NOT EXISTS assessment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
    assessment_version TEXT NOT NULL DEFAULT '1.0.0',
    scoring_version TEXT NOT NULL DEFAULT '1.0.0',
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    current_step INTEGER NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submitted_at TIMESTAMPTZ,
    result_token TEXT UNIQUE NOT NULL,
    result_token_hash TEXT UNIQUE NOT NULL,
    overall_score NUMERIC(4, 2),
    overall_category TEXT,
    primary_pattern_code TEXT REFERENCES assessment_patterns(pattern_code),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_participant ON assessment_submissions(participant_id);
CREATE INDEX IF NOT EXISTS idx_submissions_token ON assessment_submissions(result_token);
CREATE INDEX IF NOT EXISTS idx_submissions_token_hash ON assessment_submissions(result_token_hash);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON assessment_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON assessment_submissions(created_at DESC);

-- 5. Assessment Answers
CREATE TABLE IF NOT EXISTS assessment_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES assessment_submissions(id) ON DELETE CASCADE,
    item_number INTEGER NOT NULL,
    question_code TEXT NOT NULL,
    answer_value INTEGER NOT NULL CHECK (answer_value >= 1 AND answer_value <= 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (submission_id, item_number)
);

CREATE INDEX IF NOT EXISTS idx_answers_submission ON assessment_answers(submission_id);

-- 6. Pattern Results
CREATE TABLE IF NOT EXISTS pattern_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES assessment_submissions(id) ON DELETE CASCADE,
    pattern_code TEXT NOT NULL REFERENCES assessment_patterns(pattern_code),
    score NUMERIC(4, 2) NOT NULL,
    interpretation_category TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('RENDAH', 'SEDANG', 'TINGGI')),
    interpretation_text TEXT NOT NULL,
    rank INTEGER NOT NULL,
    is_priority BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (submission_id, pattern_code)
);

CREATE INDEX IF NOT EXISTS idx_pattern_results_submission ON pattern_results(submission_id);
CREATE INDEX IF NOT EXISTS idx_pattern_results_pattern ON pattern_results(pattern_code);

-- 7. Participant Reflections
CREATE TABLE IF NOT EXISTS participant_reflections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES assessment_submissions(id) ON DELETE CASCADE,
    pattern_code TEXT,
    trigger_situation TEXT,
    automatic_thoughts TEXT,
    emotions TEXT,
    response_taken TEXT,
    alternative_response TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reflections_submission ON participant_reflections(submission_id);

-- 8. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'auditor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pattern_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE participant_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_items ENABLE ROW LEVEL SECURITY;

-- Patterns and items are public read-only
CREATE POLICY "Public can read assessment patterns" ON assessment_patterns FOR SELECT USING (true);
CREATE POLICY "Public can read assessment items" ON assessment_items FOR SELECT USING (true);

-- Admins full access policy (checks auth.jwt() role / email)
CREATE POLICY "Admin full access participants" ON participants FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin full access submissions" ON assessment_submissions FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin full access answers" ON assessment_answers FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin full access pattern_results" ON pattern_results FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin full access reflections" ON participant_reflections FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin full access audit_logs" ON audit_logs FOR ALL
    USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid()));

CREATE POLICY "Admin read admin_users" ON admin_users FOR SELECT
    USING (auth.uid() = auth_user_id OR EXISTS (SELECT 1 FROM admin_users WHERE admin_users.auth_user_id = auth.uid() AND role = 'superadmin'));
