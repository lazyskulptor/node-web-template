--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: admin_auth; Type: TYPE; Schema: public; Owner: webuser
--

CREATE TYPE public.admin_auth AS ENUM (
    'MANAGER:READ',
    'SUPER:READ',
    'SUPER:WRITE',
    'MANAGER:WRITE'
);


ALTER TYPE public.admin_auth OWNER TO webuser;

--
-- Name: TYPE admin_auth; Type: COMMENT; Schema: public; Owner: webuser
--

COMMENT ON TYPE public.admin_auth IS 'kinds of auth of admin page';


--
-- Name: board_content_type; Type: TYPE; Schema: public; Owner: webuser
--

CREATE TYPE public.board_content_type AS ENUM (
    'TEXT',
    'HTML'
);


ALTER TYPE public.board_content_type OWNER TO webuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: webuser
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username character varying(128) NOT NULL,
    password character varying(256) NOT NULL,
    first_name character varying(64) NOT NULL,
    last_name character varying(64) NOT NULL,
    email character varying(256) NOT NULL,
    phone character varying(32)
);


ALTER TABLE public."user" OWNER TO webuser;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: webuser
--

CREATE TABLE public.admin (
    auths public.admin_auth,
    department character varying(128)
)
INHERITS (public."user");


ALTER TABLE public.admin OWNER TO webuser;

--
-- Name: TABLE admin; Type: COMMENT; Schema: public; Owner: webuser
--

COMMENT ON TABLE public.admin IS 'admins';


--
-- Name: board; Type: TABLE; Schema: public; Owner: webuser
--

CREATE TABLE public.board (
    board_id integer NOT NULL,
    title character varying(256) NOT NULL,
    content text NOT NULL,
    content_type character varying(8) NOT NULL,
    writer integer NOT NULL,
    reg_time timestamp without time zone DEFAULT now() NOT NULL,
    category character varying(32),
    last_updated timestamp without time zone NOT NULL
);


ALTER TABLE public.board OWNER TO webuser;

--
-- Name: board_board_id_seq; Type: SEQUENCE; Schema: public; Owner: webuser
--

CREATE SEQUENCE public.board_board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_board_id_seq OWNER TO webuser;

--
-- Name: board_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webuser
--

ALTER SEQUENCE public.board_board_id_seq OWNED BY public.board.board_id;


--
-- Name: board_comment; Type: TABLE; Schema: public; Owner: webuser
--

CREATE TABLE public.board_comment (
    comment_id bigint NOT NULL,
    board_id integer NOT NULL,
    writer integer NOT NULL,
    comment character varying(1024) NOT NULL,
    reg_time timestamp without time zone DEFAULT now() NOT NULL,
    parent_comment bigint
);


ALTER TABLE public.board_comment OWNER TO webuser;

--
-- Name: board_comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: webuser
--

CREATE SEQUENCE public.board_comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_comment_comment_id_seq OWNER TO webuser;

--
-- Name: board_comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webuser
--

ALTER SEQUENCE public.board_comment_comment_id_seq OWNED BY public.board_comment.comment_id;


--
-- Name: client; Type: TABLE; Schema: public; Owner: webuser
--

CREATE TABLE public.client (
    last_login time without time zone
)
INHERITS (public."user");


ALTER TABLE public.client OWNER TO webuser;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: webuser
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO webuser;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webuser
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: admin user_id; Type: DEFAULT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.admin ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: board board_id; Type: DEFAULT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board ALTER COLUMN board_id SET DEFAULT nextval('public.board_board_id_seq'::regclass);


--
-- Name: board_comment comment_id; Type: DEFAULT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board_comment ALTER COLUMN comment_id SET DEFAULT nextval('public.board_comment_comment_id_seq'::regclass);


--
-- Name: client user_id; Type: DEFAULT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.client ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);



--
-- Name: board_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webuser
--

SELECT pg_catalog.setval('public.board_board_id_seq', 1, false);


--
-- Name: board_comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webuser
--

SELECT pg_catalog.setval('public.board_comment_comment_id_seq', 1, false);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webuser
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- Name: board_comment board_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board_comment
    ADD CONSTRAINT board_comment_pkey PRIMARY KEY (comment_id);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (board_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: board_comment board_comment_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board_comment
    ADD CONSTRAINT board_comment_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(board_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: board_comment board_comment_fk; Type: FK CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board_comment
    ADD CONSTRAINT board_comment_fk FOREIGN KEY (parent_comment) REFERENCES public.board_comment(comment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: board_comment board_comment_writer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board_comment
    ADD CONSTRAINT board_comment_writer_fkey FOREIGN KEY (writer) REFERENCES public."user"(user_id);


--
-- Name: board writer_user_fr_key; Type: FK CONSTRAINT; Schema: public; Owner: webuser
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT writer_user_fr_key FOREIGN KEY (writer) REFERENCES public."user"(user_id);


--
-- PostgreSQL database dump complete
--

