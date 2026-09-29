-- ================================================================
-- DAYCARE WEBSITE: SUPABASE DATABASE SETUP SCRIPT
-- Copy and run this entire script in Supabase Dashboard -> SQL Editor
-- ================================================================

-- 1. Create INQUIRIES Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    topic TEXT NOT NULL DEFAULT 'visit',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create ADMISSIONS / ENROLLMENTS Table
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    child_name TEXT NOT NULL,
    child_age TEXT NOT NULL,
    program TEXT NOT NULL,
    start_date DATE NOT NULL,
    notes TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Contacted', 'Enrolled', 'Declined'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- 4. Set Policies for INQUIRIES
-- Allow any visitor to submit an inquiry
CREATE POLICY "Allow public inserts on inquiries" 
ON public.inquiries FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow authenticated admin users to read all inquiries
CREATE POLICY "Allow authenticated admin full access on inquiries" 
ON public.inquiries FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 5. Set Policies for ADMISSIONS
-- Allow any visitor to submit an admission form
CREATE POLICY "Allow public inserts on admissions" 
ON public.admissions FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow authenticated admin users to read/manage all admissions
CREATE POLICY "Allow authenticated admin full access on admissions" 
ON public.admissions FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
