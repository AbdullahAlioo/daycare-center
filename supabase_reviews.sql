-- ================================================================
-- DAYCARE WEBSITE: PARENT REVIEWS TABLE
-- Run this once in Supabase Dashboard -> SQL Editor.
-- Safe to re-run: it only creates what is missing.
-- ================================================================

-- 1. Create REVIEWS Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL CHECK (char_length(parent_name) BETWEEN 2 AND 80),
    email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 200),
    relation TEXT CHECK (char_length(relation) <= 80), -- e.g. 'Parent of a 3-year-old'
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 1000),
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 3. Column permissions for public visitors
-- Visitors can only fill in the review fields (never the status), and can
-- only read the public columns (never the email address).
REVOKE ALL ON public.reviews FROM anon;
GRANT INSERT (parent_name, email, relation, rating, message) ON public.reviews TO anon;
GRANT SELECT (id, parent_name, relation, rating, message, status, created_at) ON public.reviews TO anon;

-- 4. Set Policies for REVIEWS
-- Allow any visitor to submit a review (it always starts as Pending)
DROP POLICY IF EXISTS "Allow public review submissions" ON public.reviews;
CREATE POLICY "Allow public review submissions"
ON public.reviews FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'Pending');

-- Allow visitors to see approved reviews only
DROP POLICY IF EXISTS "Allow public to read approved reviews" ON public.reviews;
CREATE POLICY "Allow public to read approved reviews"
ON public.reviews FOR SELECT
TO anon
USING (status = 'Approved');

-- Allow authenticated admin users to read/approve/reject/delete reviews
DROP POLICY IF EXISTS "Allow authenticated admin full access on reviews" ON public.reviews;
CREATE POLICY "Allow authenticated admin full access on reviews"
ON public.reviews FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
