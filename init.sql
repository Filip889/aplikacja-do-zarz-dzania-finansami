CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.categories
(
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    user_id integer REFERENCES public.users (id) ON DELETE CASCADE,
    type character varying(10) NOT NULL DEFAULT 'expense',
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.transactions
(
    id SERIAL PRIMARY KEY,
    amount numeric(10,2) NOT NULL,
    type character varying(10) CHECK (type IN ('income', 'expense')),
    description text,
    date date NOT NULL,
    user_id integer REFERENCES public.users (id) ON DELETE CASCADE,
    category_id integer REFERENCES public.categories (id) ON DELETE SET NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.users OWNER TO postgres;
ALTER TABLE public.categories OWNER TO postgres;
ALTER TABLE public.transactions OWNER TO postgres;