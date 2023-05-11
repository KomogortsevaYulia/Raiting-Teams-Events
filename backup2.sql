--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.6

-- Started on 2023-04-24 17:13:13

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

ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_fb98daef5570cb124e34c9ea42c";
ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa";
ALTER TABLE ONLY public.achievements DROP CONSTRAINT "FK_e2c799e4fa523f355079e1b06c0";
ALTER TABLE ONLY public.journals DROP CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a";
ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_c5a362fc7d682923a6aa8f0072f";
ALTER TABLE ONLY public.teams DROP CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_bf2f38672c0046c6328e69b71e6";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_bcb2ce0072504d624725e3ef826";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_b935d793584366f2a3c196ac9d7";
ALTER TABLE ONLY public.forms DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_9025d02effbcfec592d24236f5c";
ALTER TABLE ONLY public.journals DROP CONSTRAINT "FK_811c873435715b3eb624d256a11";
ALTER TABLE ONLY public.functions DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f";
ALTER TABLE ONLY public.achievements DROP CONSTRAINT "FK_3e7e91763bdef262e9f727a1208";
ALTER TABLE ONLY public.achievements DROP CONSTRAINT "FK_2888c1257c41913030b59369f96";
ALTER TABLE ONLY public.journals DROP CONSTRAINT "FK_1b4d28fa4b326ecc43128e7d05b";
ALTER TABLE ONLY public.events DROP CONSTRAINT "FK_12ab9fec0ea7a5c0bd47f244fb7";
ALTER TABLE ONLY public.achievements DROP CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434";
ALTER TABLE ONLY public.form_fields DROP CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1";
ALTER TABLE ONLY public.dictionary DROP CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a";
ALTER TABLE ONLY public.forms DROP CONSTRAINT "PK_ba062fd30b06814a60756f233da";
ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE ONLY public.teams DROP CONSTRAINT "PK_7e5523774a38b08a6236d322403";
ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "PK_4e83554892a57d53117dc9a12bf";
ALTER TABLE ONLY public.events DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73";
ALTER TABLE ONLY public.functions DROP CONSTRAINT "PK_203889d2ae5a98ffc137739301e";
ALTER TABLE ONLY public.achievements DROP CONSTRAINT "PK_1bc19c37c6249f70186f318d71d";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda";
ALTER TABLE ONLY public.journals DROP CONSTRAINT "PK_157a30136385dd81cdd19111380";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.user_functions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.user_forms ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.teams ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.journals ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.functions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.forms ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.form_fields ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.dictionary ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.achievements ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.user_functions_id_seq;
DROP TABLE public.user_functions;
DROP SEQUENCE public.user_forms_id_seq;
DROP TABLE public.user_forms;
DROP SEQUENCE public.teams_id_seq;
DROP TABLE public.teams;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP SEQUENCE public.journals_id_seq;
DROP TABLE public.journals;
DROP SEQUENCE public.functions_id_seq;
DROP TABLE public.functions;
DROP SEQUENCE public.forms_id_seq;
DROP TABLE public.forms;
DROP SEQUENCE public.form_fields_id_seq;
DROP TABLE public.form_fields;
DROP SEQUENCE public.events_id_seq;
DROP TABLE public.events;
DROP SEQUENCE public.dictionary_id_seq;
DROP TABLE public.dictionary;
DROP SEQUENCE public.achievements_id_seq;
DROP TABLE public.achievements;
DROP TYPE public.teams_type_team_enum;
DROP TYPE public.functions_type_function_enum;
DROP TYPE public.events_location_enum;
--
-- TOC entry 845 (class 1247 OID 28018)
-- Name: events_location_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.events_location_enum AS ENUM (
    'Коворгинг Г-2',
    'Конференц-зал Технопарк',
    'Коворкинг Студотрядов',
    'Актовый зал',
    'Спортзал'
);


ALTER TYPE public.events_location_enum OWNER TO postgres;

--
-- TOC entry 848 (class 1247 OID 28042)
-- Name: functions_type_function_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.functions_type_function_enum AS ENUM (
    'general',
    'special'
);


ALTER TYPE public.functions_type_function_enum OWNER TO postgres;

--
-- TOC entry 851 (class 1247 OID 28048)
-- Name: teams_type_team_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.teams_type_team_enum AS ENUM (
    'direction',
    'university',
    'teams'
);


ALTER TYPE public.teams_type_team_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 28290)
-- Name: achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.achievements (
    id integer NOT NULL,
    title character varying NOT NULL,
    points integer NOT NULL,
    date_get date NOT NULL,
    date_add date NOT NULL,
    file character varying NOT NULL,
    date_last_edit date NOT NULL,
    date_status_changed date NOT NULL,
    comment character varying NOT NULL,
    direction_id integer,
    status_id integer,
    type_id integer,
    user_id integer
);


ALTER TABLE public.achievements OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 28289)
-- Name: achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.achievements_id_seq OWNER TO postgres;

--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 231
-- Name: achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.achievements_id_seq OWNED BY public.achievements.id;


--
-- TOC entry 230 (class 1259 OID 28246)
-- Name: dictionary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dictionary (
    id integer NOT NULL,
    name character varying NOT NULL,
    class_name character varying,
    class_id integer
);


ALTER TABLE public.dictionary OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 28245)
-- Name: dictionary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dictionary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dictionary_id_seq OWNER TO postgres;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 229
-- Name: dictionary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dictionary_id_seq OWNED BY public.dictionary.id;


--
-- TOC entry 209 (class 1259 OID 28055)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying NOT NULL,
    "dateStart" timestamp without time zone,
    "dateEnd" timestamp without time zone,
    description character varying,
    tags text,
    "dateStartRegistration" timestamp without time zone,
    "dateEndRegistration" timestamp without time zone,
    images text,
    control character varying,
    target_audience character varying,
    plan character varying,
    location public.events_location_enum,
    count_people integer,
    type_id integer,
    level_id integer,
    direction_id integer,
    type_participation_id integer,
    format_id integer,
    clarifying_direction_id integer,
    character_event_id integer,
    status boolean,
    phone character varying,
    email character varying,
    social_links text
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 28062)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 210
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 211 (class 1259 OID 28063)
-- Name: form_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_fields (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.form_fields OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 28068)
-- Name: form_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.form_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_fields_id_seq OWNER TO postgres;

--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 212
-- Name: form_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.form_fields_id_seq OWNED BY public.form_fields.id;


--
-- TOC entry 213 (class 1259 OID 28069)
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    description character varying NOT NULL,
    fields_id text NOT NULL,
    team_id integer
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 28074)
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forms_id_seq OWNER TO postgres;

--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 214
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- TOC entry 215 (class 1259 OID 28075)
-- Name: functions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.functions (
    id integer NOT NULL,
    title character varying NOT NULL,
    type_function public.functions_type_function_enum DEFAULT 'special'::public.functions_type_function_enum NOT NULL,
    team_id integer
);


ALTER TABLE public.functions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 28081)
-- Name: functions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.functions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.functions_id_seq OWNER TO postgres;

--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 216
-- Name: functions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.functions_id_seq OWNED BY public.functions.id;


--
-- TOC entry 217 (class 1259 OID 28082)
-- Name: journals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journals (
    id integer NOT NULL,
    "dateRegistration" timestamp without time zone,
    comment character varying,
    event_id integer,
    team_id integer,
    user_id integer,
    "dateParticipation" timestamp without time zone,
    qr_code character varying,
    is_uchastnik boolean DEFAULT false NOT NULL,
    is_organizator boolean DEFAULT false NOT NULL,
    is_qr_controller boolean DEFAULT false NOT NULL,
    is_can_set_results boolean DEFAULT false NOT NULL,
    is_registered boolean DEFAULT false NOT NULL,
    is_participation boolean DEFAULT false NOT NULL,
    event integer,
    team integer,
    "user" integer,
    result_place integer
);


ALTER TABLE public.journals OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 28093)
-- Name: journals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.journals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.journals_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 218
-- Name: journals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.journals_id_seq OWNED BY public.journals.id;


--
-- TOC entry 219 (class 1259 OID 28094)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 28099)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 220
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 221 (class 1259 OID 28106)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    title character varying NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    image text NOT NULL,
    tags text NOT NULL,
    description character varying NOT NULL,
    shortname character varying NOT NULL,
    id_parent integer,
    type_team public.teams_type_team_enum DEFAULT 'teams'::public.teams_type_team_enum NOT NULL,
    short_description character varying,
    is_archive boolean DEFAULT false NOT NULL,
    cabinet character varying,
    charter_team character varying,
    document character varying
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 28112)
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 222
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- TOC entry 223 (class 1259 OID 28113)
-- Name: user_forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_forms (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    value character varying NOT NULL,
    field_id integer,
    user_id integer
);


ALTER TABLE public.user_forms OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 28118)
-- Name: user_forms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_forms_id_seq OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 224
-- Name: user_forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_forms_id_seq OWNED BY public.user_forms.id;


--
-- TOC entry 225 (class 1259 OID 28119)
-- Name: user_functions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_functions (
    id integer NOT NULL,
    "dateStart" timestamp without time zone NOT NULL,
    "dateEnd" timestamp without time zone,
    function_id integer,
    user_id integer
);


ALTER TABLE public.user_functions OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 28122)
-- Name: user_functions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_functions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_functions_id_seq OWNER TO postgres;

--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_functions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_functions_id_seq OWNED BY public.user_functions.id;


--
-- TOC entry 227 (class 1259 OID 28123)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    studnumber integer,
    fullname character varying,
    email character varying NOT NULL,
    education_group character varying,
    institute character varying,
    gender character varying,
    phone character varying,
    birthdate date,
    type_time_study character varying,
    permissions text,
    username character varying DEFAULT '123'::character varying,
    password character varying DEFAULT '123'::character varying,
    image character varying,
    course integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 28130)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3250 (class 2604 OID 28293)
-- Name: achievements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements ALTER COLUMN id SET DEFAULT nextval('public.achievements_id_seq'::regclass);


--
-- TOC entry 3249 (class 2604 OID 28249)
-- Name: dictionary id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary ALTER COLUMN id SET DEFAULT nextval('public.dictionary_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 28131)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 28132)
-- Name: form_fields id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_fields ALTER COLUMN id SET DEFAULT nextval('public.form_fields_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 28133)
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 28134)
-- Name: functions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions ALTER COLUMN id SET DEFAULT nextval('public.functions_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 28135)
-- Name: journals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals ALTER COLUMN id SET DEFAULT nextval('public.journals_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 28136)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 28138)
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 28139)
-- Name: user_forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms ALTER COLUMN id SET DEFAULT nextval('public.user_forms_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 28140)
-- Name: user_functions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions ALTER COLUMN id SET DEFAULT nextval('public.user_functions_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 28141)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3458 (class 0 OID 28290)
-- Dependencies: 232
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.achievements (id, title, points, date_get, date_add, file, date_last_edit, date_status_changed, comment, direction_id, status_id, type_id, user_id) FROM stdin;
\.


--
-- TOC entry 3456 (class 0 OID 28246)
-- Dependencies: 230
-- Data for Name: dictionary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dictionary (id, name, class_name, class_id) FROM stdin;
1	Вузовский	уровень мероприятия	1
2	Городской	уровень мероприятия	1
3	Региональный	уровень мероприятия	1
4	Внешнее	тип мероприятия	2
5	Внутреннее	тип мероприятия	2
6	НИД	направление	3
7	КТД	направление	3
8	УД	направление	3
9	СД	направление	3
10	ОД	направление	3
\.


--
-- TOC entry 3435 (class 0 OID 28055)
-- Dependencies: 209
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, "dateStart", "dateEnd", description, tags, "dateStartRegistration", "dateEndRegistration", images, control, target_audience, plan, location, count_people, type_id, level_id, direction_id, type_participation_id, format_id, clarifying_direction_id, character_event_id, status, phone, email, social_links) FROM stdin;
13	Тренировка	2023-04-03 15:00:00	2023-04-03 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
14	Тренировка	2023-04-05 15:00:00	2023-04-05 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
15	Тренировка	2023-04-08 15:00:00	2023-04-08 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
16	Тренировка	2023-04-11 15:00:00	2023-04-11 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
17	Тренировка	2023-04-14 15:00:00	2023-04-14 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	Репетиция	2023-04-01 15:00:00	2023-04-01 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Актовый зал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
19	Репетиция	2023-04-05 15:00:00	2023-04-05 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Актовый зал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
20	Репетиция	2023-04-10 15:00:00	2023-04-10 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Актовый зал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
11	Аниме квиз	2023-04-09 17:00:00	2023-04-09 19:00:00	Что-то давненько мы не организовывали квизов, стоило бы исправить это небольшое недоразумение. Да и не абы как, а квизом по аниме, ещё и с конкурсом косплея 💥\n\nЕсли без предисловий, то ИИТиАД анонсирует аниме квиз, на котором вы наконец-то сможете использовать свои знания японской мультипликации в деле и весело провести время 🧙\n\nПомимо самого квиза, на мероприятии вас ждёт бар с напитками, фотозона, а также уже вышеупомянутый конкурс косплея 🎭\n\nНо что же мы всё о содержании самого квиза, можно поговорить и о награде!\nЧтобы сохранить хоть толику тайны, призы за победу в квизе останутся загадкой, однако, чтобы не оставить вас ни с чем, огласим приз за конкурс косплея)\nМы решили немного заморочиться, так что за первое место победителю достанется оригинальная японская фигурка и билет на Baikal Geek Con party, который будет проводиться через месяц 😱\n\nСобирайте команду из 3-5 человек и заполняйте заявку до 15.03 😎	Аниме,Викторина,Игра,Квиз	\N	\N	https://sun4-11.userapi.com/impg/5PLZgMLk1yyA0UkyCuh9qoN_2udssL7KgtWY2w/r2SnTooLgxE.jpg?size=1515x1516&quality=95&sign=a28ad76858039348a2c2e62c12c70312&type=album	\N	\N	\N	Коворгинг Г-2	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
12	Тренировка	2023-04-01 15:00:00	2023-04-01 18:00:00	\N	\N	\N	\N	\N	\N	\N	\N	Спортзал	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
21	Школа личностного роста и развития студенческого самоуправления	2023-04-14 12:00:00	2023-04-16 18:00:00	С 14 по 16 апреля на базе отдыха «Прибайкальская» в поселке Листвянка пройдет Школа личностного роста и развития студенческого самоуправления\n\nДа, ты не ослышался — произошло РАСШИРЕНИЕ ТЕРРИТОРИИ и теперь наша школа на новой базе отдыха 💥\n\nЧто еще нового?\nМы берем с собой ограниченное количество людей — только 70 человек поедут с нами развиваться, повышать свои софт-скиллы и становиться лучше и увереннее\n\n🔥 Секции:\n— «Социальное проектирование»: узнаем что такое социальное проектирование и разберём все этапы проекта.\n— «Точка сбора»: рассмотрим составляющие медиасферы и найдём им применение в обычной жизни\n— «Твой путь»: поможем тебе научиться достигать желаемых целей, управлять своим временем и найти 25 час в сутках\n— «Бренд в социальных сетях»: узнаем как работать в социальных сетях, развивать организацию/бренд/себя\n\n❗ ВАЖНО: участниками школы могут быть только студенты 1 и 2 курса ❗\n\nЗаявки принимаются до 5 апреля 23:59\n\nНе спеши подавать заявку — изучи каждую секцию и только потом решай куда хочешь ехать (если ты выбрал несколько секций — организаторы самостоятельно решают куда тебя отправить)\nОтправить заявку:\n→ vk.cc/cmEd00	Soft-skills,Развитие,Обучение	2023-03-29 00:00:00	2023-04-06 00:00:00	https://sun9-58.userapi.com/impg/Ls_-y6mkFOlFwlKgDZdxFaeqVyvS8nKWj-CDJw/sThd_jR8yM4.jpg?size=2560x1920&quality=95&sign=61d560de52f326852ebf0ad597f243f6&type=album	\N	Участниками школы могут быть только студенты 1 и 2 курса	\N	\N	70	4	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	Поле чудес	2023-03-26 22:05:30	2023-03-27 22:05:30	Очутиться в «телевизоре» своего детства, почувствовать настольгию и понять, что это не так-то просто. Мы часто сидели у экрана и думали: «Да как же можно этого не знать? Ну тут же слово вырисовывается элементарное! Да я бы там уже всё сто раз отгадал»	Веселье,Игра,Викторина	\N	\N	https://sun4-22.userapi.com/impg/ID3e-8pRzvt8YqnVCdlUndNUUo3UK7ZPG3bcDw/4-dCPYSWMl4.jpg?size=1647x2160&quality=95&sign=91c011b4b2c353efa49fafcfe0e014d9&type=album	Трипалюк Екатерина	Студенты - члены Профсоюза	\N	Коворгинг Г-2	70	4	1	\N	\N	\N	\N	\N	\N	+1 (555) 123-4567	example1@gmail.com	https://www.instagram.com/example1
22	Ежегодный турнир по хоккею на валенках	2023-02-21 15:30:00	2023-02-21 19:30:00	Хоккей на валенках!🏒\n\nСтудент, приглашаем тебя 21 февраля принять участие в ежегодном турнире по хоккею на валенках.\n\nПринять участие могут все желающие, для этого нужно:\n✅ Собрать команду из 4-х человек (3 игрока в поле + вратарь), количество запасных игроков не ограничено, минимум 3 человека\n✅ Выбрать капитана\n✅ Пройти регистрацию https://vk.cc/clBHHZ\n✅ Готово — вы участник захватывающего дружеского матча!\n\nДля всех участников организаторы подготовили 4 пары валенок и клюшки.\n\nНу а если ты больше за «просто посмотреть», то приходи в один из трех дней:\n20.02.2022 — матч среди сотрудников\n21.02.2022 — матч среди студентов\n22.02.2022 — матч с партнерами ИРНИТУ\n\n👉Начало всех игр в 15:30 на Стадионе ИРНИТУ\nС собой хорошее настроение!	Соревнование,Хоккей	\N	\N	https://sun9-23.userapi.com/impg/vL1O2jRKfF6SAD3-yuV94T1mjq5rpveujxEzSw/OoyTm9iaHfk.jpg?size=2402x2160&quality=96&sign=96f9a64e3df758376239468ffaa279c7&type=album	\N	\N	\N	Спортзал	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
10	Techno-квартирник	2023-05-02 17:00:00	2023-05-02 20:00:00	Techno-квартирник — вечер душевных разговоров, уютных посиделок и шанса показать себя. Вечер, где ты сможешь сделать себе крутую фотографирую, отдохнуть от учебы и насладиться творческими выступлениями.\nНе важно опытный ты певец или выступишь впервые. Это твой шанс показать себя в уютной обстановке друзей. Так что мы будем рады, каждой звёздочке.\n\nЗаполняй скорее Яндекс-форму ведь мы ждём именно тебя: https://vk.cc/cmgHpm\n\nВстретимся на самом ярком и теплом мероприятии этой весны 1	Творчество,Отдых	\N	\N	https://sun4-12.userapi.com/impg/TzSkT0ytCAVkb9wigzL7_6xtXWpPR2rtScvimw/Pzp2WlBVH80.jpg?size=1620x2160&quality=95&sign=7a228411c8a30947c6d601f2a9d86747&type=album	\N	Не важно опытный ты певец или выступишь впервые. Это твой шанс показать себя в уютной обстановке друзей. Так что мы будем рады, каждой звёздочке.	\N	Коворкинг Студотрядов	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	Спартакиада ИРНИТУ по армрестлингу	2023-03-28 17:05:00	2023-03-28 22:05:00	К участию в соревнованиях допускаются студенты основной группы здоровья\n	Спорт,Армрестлинг,Соревнование	\N	\N	https://sun9-42.userapi.com/impg/GW_f_EbozMyBUkBxzCK01wlgDbUXNMBKyYPtWA/DpRMjFVVJG8.jpg?size=2560x1980&quality=95&sign=b98e6716c579925eee3be856aa6a21f1&type=album	\N	Студенты основной группы здоровья	\N	Спортзал	30	4	1	\N	\N	\N	\N	\N	\N	+44 7911 123456	example2@hotmail.com	https://www.facebook.com/example2
8	Научный питч совместно со стартап-студией	2023-04-28 14:00:00	2023-04-28 15:00:00	Каждый желающий рассказать про свой проект может сделать это на еженедельных научных питчах!\n\nВы получите комментарии от опытных экспертов, а в это раз экспертами будут инвесторы и основатели Стартап-студии.	Наука,Выступления,Презентации,Проекты	\N	\N	\N	Лужецкая А.А.	Cтуденты всех курсов и направлений	\N	Коворгинг Г-2	\N	4	\N	\N	\N	\N	\N	\N	\N	+33 6 12 34 56 78	example3@yahoo.com	https://www.twitter.com/example3
9	Смотри на бизнес как стратег	2023-05-28 13:00:00	2023-05-28 16:00:00	«Го» — настольная игра, направленная на логику и с глубоким стратегическим содержанием.\n\nИстория игры идёт из далекой древности в Китае 🐲\n\nЗачем играть в Го?\n📢Изучение игры развивает память, сосредоточенность, способность к многофакторному анализу ситуации, что особенно ценно в быстро меняющемся мире. Но главное, Го прививает способность размышлять и принимать взвешенные решения, предугадывая действия противника.\n\n⚠Настоящая польза от игры в Го заключается не в том, чтобы получить какой-то разряд, и не в том, чтобы просто заучить стратегические принципы наизусть. Идея в том, чтобы за доской понять особенности собственного мышления, раскрыть свою индивидуальность и найти личный, подходящий именно вам стиль игры.\nПроект реализован при поддержке Управления по молодёжной политике и Профкома студентов в рамках конкурса «Студенческие инициативы ИРНИТУ»	Игра,Soft-skills,Развитие	\N	\N	https://sun9-34.userapi.com/impg/FRx1ue_OSSYmbRj5vaeKOiZJ1sb_mxmE37P5Yg/yHvwGe253dk.jpg?size=2284x2160&quality=96&sign=2cc5f2692393ddad9f083b20b64df7ea&type=album	\N	\N	\N	Коворкинг Студотрядов	\N	\N	\N	\N	\N	\N	\N	\N	\N	+81 3-1234-5678	example4@outlook.com	https://www.linkedin.com/in/example4
\.


--
-- TOC entry 3437 (class 0 OID 28063)
-- Dependencies: 211
-- Data for Name: form_fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_fields (id, title) FROM stdin;
1	Был ли у вас опыт работы с детьми?
2	Назовите вашу самую характерную черту.\n
5	Что является вашим главным недостатком?\n
6	Несправидливо ли ставить людей с темным цветом кожи руководителями над белыми людьми?
7	Какова ваша мечта о счастье?\n
8	Что вы больше всего ненавидите?\n
9	Каков ваш девиз?\n
10	Какую реформу вы цените особенно высоко?\n
11	Что вы больше всего ненавидите?\n
3	Ты мужчина?
4	Ты студент?
\.


--
-- TOC entry 3439 (class 0 OID 28069)
-- Dependencies: 213
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, date, description, fields_id, team_id) FROM stdin;
1	2017-05-09 00:00:00	Это форма для вступления в науку	1\n2\n3\n4\n5\n6	6
2	2017-05-09 00:00:00	Это форма для вступления в баскетбольный клуб	1\n2\n3\n4\n5\n6	8
\.


--
-- TOC entry 3441 (class 0 OID 28075)
-- Dependencies: 215
-- Data for Name: functions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.functions (id, title, type_function, team_id) FROM stdin;
14	Руководитель	general	6
15	Руководитель	general	7
16	Руководитель	general	8
17	Руководитель	general	15
18	Руководитель	general	15
19	Руководитель	general	15
20	Руководитель	general	15
21	Руководитель	general	15
22	Руководитель	general	15
24	Заместитель	general	15
25	Заместитель	general	15
26	Заместитель	general	15
27	Заместитель	general	15
28	Заместитель	general	15
29	Заместитель	general	15
30	Заместитель	general	15
31	Заместитель	general	15
32	Заместитель	general	15
33	Заместитель	general	15
34	Участник	general	15
35	Участник	general	15
36	Участник	general	15
37	Участник	general	15
38	Участник	general	15
39	Участник	general	15
40	Участник	general	15
41	Участник	general	15
42	Участник	general	15
43	Участник	general	15
44	Руководитель	special	15
45	Руководитель	special	15
46	Руководитель	special	15
47	Руководитель	special	15
48	Руководитель	special	15
49	Руководитель	special	15
50	Руководитель	special	15
51	Руководитель	special	15
52	Руководитель	special	15
53	Руководитель	special	15
54	Руководитель	special	15
55	Руководитель	special	15
\.


--
-- TOC entry 3443 (class 0 OID 28082)
-- Dependencies: 217
-- Data for Name: journals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journals (id, "dateRegistration", comment, event_id, team_id, user_id, "dateParticipation", qr_code, is_uchastnik, is_organizator, is_qr_controller, is_can_set_results, is_registered, is_participation, event, team, "user", result_place) FROM stdin;
8	\N	\N	20	7	\N	2023-04-10 16:00:00	\N	f	t	f	f	f	f	\N	\N	\N	\N
5	2023-04-10 15:00:00	\N	20	6	55	2023-04-10 16:00:00	\N	f	t	t	t	f	f	\N	\N	\N	\N
7	2023-04-10 12:00:00	\N	20	8	31	2023-04-10 16:00:00	\N	t	f	f	f	f	f	\N	\N	\N	\N
\.


--
-- TOC entry 3445 (class 0 OID 28094)
-- Dependencies: 219
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
22	1670203838600	auto1670203838600
23	1670670136270	auto1670670136270
1	1670674251360	auto1670674251360
2	1679579189617	auto1679579189617
3	1679580162792	auto1679580162792
4	1679600877891	auto1679600877891
5	1679631617967	auto1679631617967
6	1679762940334	auto1679762940334
7	1679763749838	auto1679763749838
8	1679764639564	auto1679764639564
9	1679839434567	auto1679839434567
10	1679849101274	auto1679849101274
11	1679849682079	auto1679849682079
12	1679850268361	auto1679850268361
13	1679850668307	auto1679850668307
14	1680581129109	auto1680581129109
15	1680782266551	auto1680782266551
16	1680782719628	auto1680782719628
17	1681638546114	auto1681638546114
18	1681794551182	auto1681794551182
19	1681810784372	auto1681810784372
20	1681812791342	auto1681812791342
24	1681894440400	auto1681894440400
25	1681902326411	auto1681902326411
26	1682039033337	auto1682039033337
27	1682308636196	auto1682308636196
29	1682321490845	auto1682321490845
32	1682323112038	auto1682323112038
\.


--
-- TOC entry 3447 (class 0 OID 28106)
-- Dependencies: 221
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (id, title, creation_date, image, tags, description, shortname, id_parent, type_team, short_description, is_archive, cabinet, charter_team, document) FROM stdin;
1	ИРНИТУ	2010-05-09 00:00:00	/image.jpg	лучший университет	Иркутский Национальный Исследовательский Технический Институт	ПОЛИТЕХ	\N	university	\N	f	\N	\N	\N
12	Интеллектуальный клуб студентов	2011-05-09 00:00:00	https://sun9-6.userapi.com/impg/ZDVcop3wpQMX4E3vAxse9hNWm1k1p9lp56_52Q/R5BF42BisUQ.jpg?size=1200x1201&quality=95&sign=8486f925a7e7b74d1aafc15f87d5e28c&type=album	Творчество,Искусство,Наука,Интеллектуальные игры	Интеллектуальный клуб студентов-ИКС - это сообщество студентов, увлеченных наукой, технологиями и развитием своих умственных способностей. В нашем клубе вы найдете единомышленников, готовых поделиться своими знаниями и опытом, а также обучиться новым навыкам и расширить свой кругозор. Мы проводим встречи, дискуссии, лекции и турниры по различным тематикам, таким как IT, наука, философия, литература и многое другое. Присоединяйтесь к нам, чтобы обрести новых друзей, раскрыть свой потенциал и увлечься интеллектуальной деятельностью!	ИКС	4	teams	Интеллектуальный клуб студентов - сообщество умных студентов, участвующих в интеллектуальных играх, обменах знаниями и организации мероприятий. В клубе ИКС можно расширить кругозор, научиться новому и встретить единомышленников.\n\n\n\n	f	\N	\N	\N
6	Студенческое научное общество «Квантум»	2011-05-09 00:00:00	https://static.tildacdn.com/tild3961-6562-4834-a333-306661303635/_.gif	Инновации,Исследования,НаучноеCooбщество	Студенческое научное общество Квантум - это сообщество студентов, которые интересуются квантовой физикой, желают углубить свои знания в этой области, участвовать в научных исследованиях и общаться с единомышленниками.\n\nВ рамках "Квантума" вы сможете участвовать в научных симпозиумах, конференциях и семинарах, узнавать о последних тенденциях в квантовой физике и делиться своим опытом.\n\nВы также сможете получить доступ к лабораториям, оборудованию и инструментам, необходимым для проведения исследований.\n\nКроме того, вы сможете знакомиться с научными работниками и профессорами, которые разделяют ваш интерес к квантовой физике, и получать от них консультации и рекомендации.\n\nПрисоединяйтесь к нашему сообществу "Квантум" и откройте для себя новые горизонты в науке, сделайте новые знакомства и обретите опыт, который поможет вам в будущем!	Наука	2	teams	Студенческое научное общество «Квантум» - сообщество студентов, увлеченных квантовой физикой. Мы исследуем явления квантовой механики, проводим исследования и участвуем в научных мероприятиях.	f	\N	\N	\N
14	Учебная деятельность	2010-05-09 00:00:00	/image_study.jpg	учеба\nстатьи	учеба	УД	1	direction	\N	f	\N	\N	\N
17	hddddhh	2011-05-09 00:00:00	https://sun9-81.userapi.com/impg/iEgk-ZtH1gUbWLlppxyjLKLhVb7HglMALoaxhA/5dH70LKaJM4.jpg?size=1280x853&quality=96&sign=3d15cb1ae1f4e258fac91dcdbf2e9e7e&type=album	Театр,Актерское мастерство\n	Хотим подняться на гору	train1	5	teams	В театре студенты изучают актерское мастерство, сценическую речь и движение, и также есть студии художественного слова и эстрадной миниатюры. Театр "Предместье" - целая семья со своими традициями.	f	8	\N	hddddhh
16	Танцевально-спортивный клуб «Академик». Народный коллектив Ансамбль бального танца «Академик»	2011-05-09 00:00:00	https://sun9-28.userapi.com/impg/_bkYuxPNFqGqlYD9KHykzrfRbCvVwdllh_qzWw/EU6SEeABpaU.jpg?size=2146x1874&quality=95&sign=c621426bcb42e6f722d659e4e4445ae6&type=album	Бальные танцы,Выступления,Мероприятия	«Академик» – это один из лидеров в области танцевального спорта среди клубов Иркутской области и России. Успехи клуба определяются многолетними традициями, профессионализмом и бескомпромиссным качеством обучения, достигаемым благодаря работе лучших преподавателей, созданию прекрасных условий для занятий и великолепной атмосферы, царящей в зале.\n\nРуководитель Скоморовский Максим Валерьевич\n\nПедагоги коллектива: Камалдина Эльмира Ибрагимовна, Балясин Владислав Игоревич, Бутаков Евгений Александрович\n\nОсновная информация о коллективе:\n\nфиналист Чемпионата России среди команд "формейшн", Чемпион Сибири "формейшн", обладатель Гран-При фестиваля "Солнечный ветер" г. Барнаул\nТанец - школа, способная воспитать в человеке множество незаменимых качеств, начиная от красивых линий тела и стремительной его подвижности и заканчивая железной волей, закалённым характером. А прелесть бальных танцев в том, что два человека соединяются вместе и танцуют как одно целое. Участие в соревнованиях, исполнение шоу-номеров, выступление в составе ансамбля дают широкое поле для творческого развития молодёжи	Академик	5	teams	Ансамбль занимается бальными танцами, проводит мастер-классы и выступает на конкурсах и фестивалях. Участники коллектива не только танцуют, но и создают костюмы и украшения для своих выступлений.	f	\N	\N	\N
8	Баскетбол юноши	2011-05-09 00:00:00	https://static.tildacdn.com/tild3961-6562-4834-a333-306661303635/_.gif	Баскетбол,Команда,Соревнования,Тренировки	Коллектив Баскетбол юноши - это сообщество студентов, увлеченных спортом и баскетболом в частности. У нас есть опытные тренеры, которые помогают нам развиваться в спорте и участвовать в разных соревнованиях на разных уровнях, от вузовских до международных. Наш коллектив - это не только возможность заниматься любимым делом, но и дружеская команда, в которой каждый член может развиваться и находить новых друзей. Мы проводим тренировки, на которых учимся работать в команде, развиваем технику и тактику игры, а также физическую подготовку. У нас также есть возможность посещать лагеря и сборы, где мы можем показать свои навыки в соревнованиях. Присоединяйтесь к нам и попробуйте себя в баскетболе!	Баскетбол	3	teams	Коллектив "Баскетбол юноши" - это студенческая команда, занимающаяся баскетболом и участвующая в соревнованиях. Тренировки проводятся квалифицированными тренерами, готовящими спортсменов к достижению высоких результатов.	f	\N	\N	\N
9	Волейбол юноши	2011-05-09 00:00:00	https://static.tildacdn.com/tild3961-6562-4834-a333-306661303635/_.gif	Волейбол,Спорт,ЗдоровыйОбразЖизни	Коллектив Волейбол юноши - это сообщество студентов, увлеченных волейболом и здоровым образом жизни, которые занимаются этим видом спорта и принимают участие в соревнованиях на различных уровнях. У нас есть опытные тренеры, которые помогут вам стать лучшими и достичь успеха в соревнованиях. Мы проводим не только тренировки, но и мероприятия, такие как турниры и волейбольные игры, где вы сможете показать свои навыки и насладиться игрой. В нашей команде царит дружеская и поддерживающая атмосфера, которая поможет вам прогрессировать в волейболе и развиваться как личность. Присоединяйтесь к нам, чтобы стать частью этой команды и получить новые знакомства, эмоции и навыки в волейболе!	Волейбол	3	teams	"Волейбол юноши" - команда студентов, увлеченных волейболом и здоровым образом жизни. Мы тренируемся под руководством профессиональных тренеров, участвуем в соревнованиях и дружно поддерживаем друг друга.	f	\N	\N	\N
10	Студенческие отряды	2011-05-09 00:00:00	https://sun4-11.userapi.com/impg/aCk6mxpkQUL_AxEkfjkQWTeza0M377--LxgOfw/3Yffdw2EJpw.jpg?size=1080x1080&quality=96&sign=6fdb94b4cb1447bd09b8d7aa222176a3&type=album	Лидерство,Экология,Друзья	Коллектив Студенческие отряды - это добровольческое сообщество студентов, которые объединены общей идеей помощи окружающим и улучшения условий жизни в своих городах и селах. Мы проводим различные социальные проекты, в том числе благоустройство территорий, помощь в организации мероприятий, помощь в оздоровлении, экологические и образовательные программы. Отряды работают в разных направлениях, в зависимости от интересов и возможностей участников. Участие в отряде - это не только возможность помочь другим, но и развить лидерские качества, научиться работать в команде и получить новые знания и навыки. Присоединяйтесь к нам, чтобы стать частью большого и дружного сообщества, которое делает мир лучше!	СтудОтряды	4	teams	Студенческие отряды - это сообщество студентов, которые добровольно участвуют в общественных работах, экологических акциях и организации культурных мероприятий, чтобы сделать мир лучше. 	f	\N	\N	\N
11	Добровольцы	2011-05-09 00:00:00	https://sun9-52.userapi.com/impg/-oj1T-Lc1UZVu3064uQY0DvwT2UAUTOI5Z6RXQ/pqpI4ROX38Q.jpg?size=1240x1240&quality=95&sign=1eb111e2c7e8ca9323f9c89afe787e9e&type=album	Добро,Благотворительность,Волонтёрство,Помощь,Сообщество	Коллектив Добровольцы - это сообщество студентов, которые стремятся к саморазвитию, укреплению своих навыков и знаний, а также помощи другим. У нас вы сможете проявить свою социальную ответственность и волю к действию, принимая участие в различных благотворительных мероприятиях, таких как сбор и переработка мусора, помощь в приютах для бездомных животных, работа с детьми и многое другое. Мы уверены, что работа в команде и совместные проекты помогут вам раскрыть свой потенциал и стать лучшими версиями себя. Присоединяйтесь к "Добровольцам", чтобы сделать свой вклад в улучшение нашей общей жизни!	Страдание	4	teams	"Добровольцы" - это сообщество студентов, готовых помочь людям и сделать мир лучше, участвуя в благотворительных мероприятиях, волонтёрстве и акциях, нацеленных на поддержку нуждающихся, окружающей среды и животных. Наша команда действует в различных областях и всегда открыта для новых участников, готовых помочь в реализации благотворительных проектов.	f	\N	\N	\N
2	Научная деятельность	2010-05-09 00:00:00	/image_scince.jpg	наука\nизучение	Научное направление	НИД	1	direction	\N	f	\N	\N	\N
3	Спортивная деятельность	2010-05-09 00:00:00	/image_sport.jpg	спорт\nсоревнование	Спортивное направление	СД	1	direction	\N	f	\N	\N	\N
5	Культурная массовая деятельность	2010-05-09 00:00:00	/image_culture.jpg	танцы\nпесни\nмузыка	Культурная деятельность	КТД	1	direction	\N	f	\N	\N	\N
4	Общественная деятельность	2010-05-09 00:00:00	/image_social.jpg	танцы\nпесни\nмузыка	Общесвенное направление	ОД	1	direction	\N	f	45	\N	\N
15	Народный коллектив ансамбль русской песни "Калина"	2011-05-09 00:00:00	https://sun9-13.userapi.com/impf/c857420/v857420789/64aae/1vOABDL67UU.jpg?size=2560x1707&quality=96&sign=1d99c14e2c3627c364c1bf87db709bf9&type=album	КАЛИНА,РусскаяПесня,Ансамбль,НародныйКоллектив	Коллектив "КАЛИНА" - народный ансамбль русской песни Иркутского национального технического университета, который существует уже более 50 лет и является одним из самых известных и уважаемых коллективов в Иркутске и регионе.\nВ состав ансамбля входят студенты и выпускники университета, которые соединили свой талант, любовь к народной музыке и желание сохранить и продолжить традиции русской культуры.\n"КАЛИНА" выступает на различных мероприятиях, таких как гала-концерты, праздники и фестивали, как в Иркутске, так и за его пределами. Ансамбль гордится своей богатой репертуарной программой, которая включает в себя как народные песни, так и авторские произведения в жанре русской песни.\nКроме того, в коллективе существует активная творческая работа, которая включает в себя создание новых аранжировок, песен и музыкальных номеров, что позволяет ансамблю постоянно развиваться и быть в тренде.\nПрисоединяйтесь к "КАЛИНЕ", чтобы раскрыть свой творческий потенциал, насладиться уникальной атмосферой и принять участие в прекрасных мероприятиях вместе с душевной командой профессионалов.	Калина	5	teams	КАЛИНА - это народный коллектив ансамбля русской песни ИРНИТУ, состоящий из студентов, которые исполняют народные песни и танцы разных регионов России. Ансамбль уже более 50 лет радует своей музыкой и выступает на различных концертах и фестивалях. Присоединяйтесь к нам, чтобы узнать больше о культурном наследии России и стать частью нашей творческой команды.	f	\N	\N	\N
7	Гиревой спорт	2011-05-09 00:00:00	https://static.tildacdn.com/tild3961-6562-4834-a333-306661303635/_.gif	ЗОЖ,Спорт,Тренировки,Команда	Коллектив Гиревой спорт - это команда студентов, увлеченных культурой здорового образа жизни, которые занимаются гиревым спортом, повышают физическую форму и участвуют в спортивных мероприятиях.\n\nВ рамках нашего коллектива вы сможете заниматься тренировками, участвовать в соревнованиях и получать опыт от профессиональных тренеров.\n\nМы гарантируем поддержку и дух команды, которые помогут вам достигнуть новых высот в спорте и повысить свою самооценку.\n\nПрисоединяйтесь к нашему коллективу "Гиревой спорт" и станьте частью дружной команды, которая поможет вам раскрыть свой потенциал, поднять физическую форму и сформировать здоровый образ жизни!	Гиревой	3	teams	Коллектив "Гиревой спорт" - это студенческое сообщество, занимающееся гиревым спортом и участвующее в соревнованиях под руководством профессиональных тренеров. Присоединяйтесь к нам и станьте частью дружной команды!	f	55	\N	\N
\.


--
-- TOC entry 3449 (class 0 OID 28113)
-- Dependencies: 223
-- Data for Name: user_forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_forms (id, date, value, field_id, user_id) FROM stdin;
\.


--
-- TOC entry 3451 (class 0 OID 28119)
-- Dependencies: 225
-- Data for Name: user_functions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_functions (id, "dateStart", "dateEnd", function_id, user_id) FROM stdin;
6	2023-03-26 22:05:30.095	\N	14	54
7	2023-03-26 22:05:30.096	\N	16	56
8	2023-03-26 22:05:30.096	\N	17	57
9	2023-03-26 22:05:30.096	\N	19	59
10	2023-03-26 22:05:30.096	\N	20	60
11	2023-03-26 22:05:30.096	\N	21	61
12	2023-03-26 22:05:30.097	\N	22	62
13	2023-03-26 22:05:30.096	\N	18	58
14	2023-03-26 22:05:30.096	\N	15	55
15	2023-03-26 22:07:00.23	\N	33	13
16	2023-03-26 22:07:00.229	\N	24	4
17	2023-03-26 22:07:00.23	\N	27	7
18	2023-03-26 22:07:00.23	\N	28	8
19	2023-03-26 22:07:00.23	\N	29	9
20	2023-03-26 22:07:00.23	\N	30	10
21	2023-03-26 22:07:00.23	\N	31	11
22	2023-03-26 22:07:00.23	\N	32	12
23	2023-03-26 22:07:00.23	\N	25	5
24	2023-03-26 22:07:00.23	\N	26	6
26	2023-03-26 22:11:46.827	\N	35	13
27	2023-03-26 22:11:46.826	\N	35	5
28	2023-03-26 22:11:46.826	\N	35	7
29	2023-03-26 22:11:46.826	\N	35	8
30	2023-03-26 22:11:46.826	\N	35	9
31	2023-03-26 22:11:46.826	\N	35	10
32	2023-03-26 22:11:46.827	\N	35	12
33	2023-03-26 22:11:46.825	\N	35	4
34	2023-03-26 22:11:46.826	\N	35	6
35	2023-03-26 22:11:46.827	\N	35	11
36	2023-03-26 22:12:17.497	\N	36	17
37	2023-03-26 22:12:17.497	\N	36	18
38	2023-03-26 22:12:17.497	\N	36	19
39	2023-03-26 22:12:17.497	\N	36	20
40	2023-03-26 22:12:17.497	\N	36	21
41	2023-03-26 22:12:17.496	\N	36	9
42	2023-03-26 22:12:17.496	\N	36	11
\.


--
-- TOC entry 3453 (class 0 OID 28123)
-- Dependencies: 227
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, studnumber, fullname, email, education_group, institute, gender, phone, birthdate, type_time_study, permissions, username, password, image, course) FROM stdin;
28	3316560	Филиппов Даниил Богданович	student25@mail.ru	ИСТб-19-2	Институт недропользования	Муж	\N	\N	Очно-заочно	\N	student25	$argon2id$v=19$m=65536,t=3,p=4$o90cKwpwV/HeqIJRvpPFtQ$uUrSvWLQrPH1bfUAq8znYALhkAby5BQ2qdzaoqIl+YA	\N	\N
29	7961870	Соколов Макар Миронович	student26@mail.ru	ТХб-19-2	Институт архитектуры, строительства и дизайна	Муж	\N	\N	Очно	\N	student26	$argon2id$v=19$m=65536,t=3,p=4$ctdM2xCDcLrHnhwPz3sCeA$5ZVhxRAQX69b0WfcFWEiGzGr9oxKqkE+QhrgVcolqUY	\N	\N
4	4108046	Иванов Степан Максимович	student1@mail.ru	БТПб-20-1	Институт информационных технологий и анализа данных	Муж	\N	\N	Очно	\N	student1	$argon2id$v=19$m=65536,t=3,p=4$RwgUCAEy+DvqeBJnuKrKBg$w4+V+SBcWAJgizdLvJ1iP3NVPhxhnjy8JP2R9BtSJOE	\N	\N
26	3362967	Савельев Валерий Иванович	student23@mail.ru	ЛМБм-21-1	Институт информационных технологий и анализа данных	Муж	\N	\N	Очно-заочно	\N	student23	$argon2id$v=19$m=65536,t=3,p=4$5qMV3eHD0Ef1Q526N0DQ8w$8ccS34gH+44ZYG00hfEtUZHL5XHfiAcQFnMi73B9lmE	\N	\N
15	6844248	Устинова Александра Артёмовна	student12@mail.ru	ИСТб-19-2	Институт недропользования	Жен	\N	\N	Очно-заочно	\N	student12	$argon2id$v=19$m=65536,t=3,p=4$5hCSjGbI3rpfhG8bzAOF7A$V2sVmrb+p74orsJ8hbgICsIdJ4zrTVY1HgYZ8pPgtMI	\N	\N
11	9613358	Пономарева Мария Марковна	student8@mail.ru	ИСТб-19-2	Институт недропользования	Жен	\N	\N	Очно	\N	student8	$argon2id$v=19$m=65536,t=3,p=4$7kXwegSAO0fSk+TP3QRlJw$TrLJ+sqAbzFLGVJcWMI8IIPIW14lZ2qSEt2LyvTVsP0	\N	\N
16	4025438	Васильева Ева Матвеевна	student13@mail.ru	ДСб-20-1	Институт высоких технологий	Жен	\N	\N	Очно	\N	student13	$argon2id$v=19$m=65536,t=3,p=4$hQAs6G/0LaJyC1M9Y5cAzA$QE39+ki/HwCmuEmsVXIEUPY8MlZUGU43/2hMhZQbzfQ	\N	\N
6	4532537	Новикова София Тимофеевна	student3@mail.ru	ТХб-19-2	Институт архитектуры, строительства и дизайна	Жен	\N	\N	Очно	\N	student3	$argon2id$v=19$m=65536,t=3,p=4$GUrGxbYPY8mhxDcHD558sw$Wu0WHA2CLHCmX61TUpBJZ5w/f5AMIsu8bjE3UXD+Tn4	\N	\N
5	8271949	Пономарев Александр Артёмович	student2@mail.ru	УПКм-22-1	Институт архитектуры, строительства и дизайна	Муж	\N	\N	Очно	\N	student2	$argon2id$v=19$m=65536,t=3,p=4$hIbco9n2Zie74DU0DZnZCg$uxfETfrgx6Tjnxx2NIi8F+BPQ3jBLp2zuoqbr1aXw4s	\N	\N
17	9153407	Сахарова Елизавета Михайловна	student14@mail.ru	ИСТб-19-2	Институт авиамашиностроения и транспорта	Жен	\N	\N	Очно	\N	student14	$argon2id$v=19$m=65536,t=3,p=4$P6tcxJsL3S7BIDiNenewVg$DLmALMweeYwtFAHLWJfgohcpCCnnmTo5s1Sa//XHi8Q	\N	\N
3	4108046	Иванов Иван Иванович	admin@mail.ru	\N	Институт информационных технологий и анализа данных	Муж	\N	\N	\N	can create teams,can view directions,can view reports directions,can view reports teams,can view reports,can view teams reports	admin	$argon2id$v=19$m=65536,t=3,p=4$eYagnHph8wdEB0R0QMTlMw$RvRIdnvaS9BpPGt0+I6NmHqqO5D3dD4ethpHp92rlNA	https://sun9-4.userapi.com/impg/PlbA1QKETnQLakTWa4D66ByJYgXxFRDT2abOZA/TNkYrlgxyn0.jpg?size=2560x1920&quality=96&sign=726c0677fb1e31e6f3d7e5003c43fe9e&type=album	4
12	5328175	Смирнова Виктория Петровна	student9@mail.ru	ЛМБм-21-1	Институт недропользования	Жен	\N	\N	Очно	\N	student9	$argon2id$v=19$m=65536,t=3,p=4$Z7QPxKUVkBETJ58w/EdI6Q$/5rDD27KWojYUzRRaxZO52f8LPZT4JCPev8ZscpAfLc	\N	\N
10	5117772	Гордеева Кира Кирилловна	student7@mail.ru	ЛМБм-21-1	Институт информационных технологий и анализа данных	Жен	\N	\N	Очно-заочно	\N	student7	$argon2id$v=19$m=65536,t=3,p=4$loRd2vZObolgcPXj3mSVuQ$HSGCO52IVP03/ncXNxTwvmm154XLuDJPRumP2gJZQlM	\N	\N
8	9414304	Цветков Марсель Степанович	student5@mail.ru	ТХб-19-2	Институт информационных технологий и анализа данных	Муж	\N	\N	Очно	\N	student5	$argon2id$v=19$m=65536,t=3,p=4$AtPAZjO96YJNZvO5SZKiBg$RRXW96GJs9P9WsjyABUJZ8sS6lHyief6fZ25dBNnvpI	\N	\N
9	9390413	Румянцев Даниил Константинович	student6@mail.ru	ТХб-19-2	Институт архитектуры, строительства и дизайна	Муж	\N	\N	Очно-заочно	\N	student6	$argon2id$v=19$m=65536,t=3,p=4$7TmXD+z2nLCEXnlgmMg6kA$2ztUtFj1i0pO0b3mgJL5KZzNZE0ragPOLCrodja48nE	\N	\N
23	5020039	Самсонов Дмитрий Платонович	student20@mail.ru	ДСб-20-1	Институт информационных технологий и анализа данных	Муж	\N	\N	Очно	\N	student20	$argon2id$v=19$m=65536,t=3,p=4$SEIUtdZ52wGXiym9+Lx1iQ$v74tbTQcoR1/3GcwxLuePCCNSyEjJ2bgBYZY6VlVW4M	\N	\N
7	7072966	Агафонова Алиса Денисовна	student4@mail.ru	УПКм-22-1	Институт высоких технологий	Жен	\N	\N	Очно	\N	student4	$argon2id$v=19$m=65536,t=3,p=4$Itvq1HzrXhR8TYdEghkC3Q$NZMtpIPg7qRybwPtMkOqyEW00gHCG9cqQiLakMb7Q7M	\N	\N
25	7373558	Ермаков Никита Артёмович	student22@mail.ru	УПКм-22-1	Институт архитектуры, строительства и дизайна	Муж	\N	\N	Очно-заочно	\N	student22	$argon2id$v=19$m=65536,t=3,p=4$FxaGUQ6jShGAemKat4IVXw$uSbWTsQk1aBsJstU03zxsiupLbTy/TSB13LPZy6VN3E	\N	\N
27	4718773	Кузнецов Дмитрий Владиславович	student24@mail.ru	ДСб-20-1	Институт информационных технологий и анализа данных	Муж	\N	\N	Очно-заочно	\N	student24	$argon2id$v=19$m=65536,t=3,p=4$gNTmyE7ry8tGq4VmqSZBcQ$FKV3wQ5NeB8kcq52GNxfZQ8vHEbIZKOSwSbvi4HvEY4	\N	\N
19	1413716	Киселев Ярослав Александрович	student16@mail.ru	ИСТб-19-2	Институт авиамашиностроения и транспорта	Муж	\N	\N	Очно	\N	student16	$argon2id$v=19$m=65536,t=3,p=4$9Z/lbLR7wByoPc8RL28iPg$F3aHagOrXTmWBAn54GpLizEPS5z9VHnvnL+kthYWO98	\N	\N
33	9735580	Гончаров Фёдор Витальевич	student30@mail.ru	ДСб-20-1	Институт авиамашиностроения и транспорта	Муж	\N	\N	Очно-заочно	\N	student30	$argon2id$v=19$m=65536,t=3,p=4$tiAvAEjaOP4OmzRKUEbKEg$ICC4qvOfdsltG1tNsB29K32EXmeJTXIr+adxmE8816I	\N	\N
32	4956830	Голованова Вера Павловна	student29@mail.ru	ИСТб-19-2	Институт информационных технологий и анализа данных	Жен	\N	\N	Очно	\N	student29	$argon2id$v=19$m=65536,t=3,p=4$VPSuTPNweoGoNbJSVEoOSA$zKnJOSWu9XMP/uuU5SKRXg86ylyNfR6Kg/W8g4ASHks	\N	\N
31	5683292	Соболев Никита Львович	student28@mail.ru	УПКм-22-1	Институт высоких технологий	Муж	\N	\N	Очно-заочно	\N	student28	$argon2id$v=19$m=65536,t=3,p=4$h9yDYoK300JN410HAPdf2g$PUb6jlOUbvDGKthWgtduyAEax6b7jrFrXW+PiT0ICC4	\N	\N
13	2844304	Киселев Владимир Андреевич	student10@mail.ru	БТПб-20-1	Институт высоких технологий	Муж	\N	\N	Очно	\N	student10	$argon2id$v=19$m=65536,t=3,p=4$9rEyAjBbVJidbR6mJAR3og$CjszEbcMLAia13XjamKxJyJd7wNBFjUoyc0K4G1AoS0	\N	\N
14	6770115	Самсонов Кирилл Львович	student11@mail.ru	ТХб-19-2	Институт недропользования	Муж	\N	\N	Очно-заочно	\N	student11	$argon2id$v=19$m=65536,t=3,p=4$4ot2szGSTdSQ12CXOGAwww$lxdth5jQRoGnAwLyiTMiSRRIDheio4Hp+OV9XQkt9oA	\N	\N
18	5797251	Иванов Роман Павлович	student15@mail.ru	ТХб-19-2	Институт недропользования	Муж	\N	\N	Очно-заочно	\N	student15	$argon2id$v=19$m=65536,t=3,p=4$7/FKzG76XZ+HaZzHaGH7Dg$TyrZseGcomd5fonVMPCPJcZAkIg4JSCw5xcM4b7rm+8	\N	\N
20	2946288	Семенова Алиса Андреевна	student17@mail.ru	ИСТб-19-2	Институт архитектуры, строительства и дизайна	Жен	\N	\N	Очно	\N	student17	$argon2id$v=19$m=65536,t=3,p=4$GqqeKzTr0C3zGZYKQRXW6Q$3PRQnuIhno0JbLb6yMiuZ+2KHflJpoZi22p74G9uEhQ	\N	\N
21	5235850	Позднякова Вероника Алиевна	student18@mail.ru	ИСТб-19-2	Институт авиамашиностроения и транспорта	Жен	\N	\N	Очно-заочно	\N	student18	$argon2id$v=19$m=65536,t=3,p=4$JlPXCiz8nyX8qiOzFD+gdQ$DFdp4Amq1sb8y0s/sHGQrY/XN0MKivn4SBrwqocuM7o	\N	\N
22	7304032	Иванова Анна Никитична	student19@mail.ru	ИСТб-19-2	Институт высоких технологий	Жен	\N	\N	Очно-заочно	\N	student19	$argon2id$v=19$m=65536,t=3,p=4$H8WhZ2x/HtNuB7ZPM0xpLw$GnU5EScx+wclsmqoxw9U0IICv9W+oM8M1mRfO55wEgQ	\N	\N
24	4821973	Иванова Николь Марковна	student21@mail.ru	УПКм-22-1	Институт архитектуры, строительства и дизайна	Жен	\N	\N	Очно-заочно	\N	student21	$argon2id$v=19$m=65536,t=3,p=4$3W/5zQECNp2o+DiafWjgNA$/iJANO97ME6ajA3uq75E1LLbttYzLTFHAKHhpdO/WoY	\N	\N
30	7907050	Баранова Варвара Владиславовна	student27@mail.ru	УПКм-22-1	Институт архитектуры, строительства и дизайна	Жен	\N	\N	Очно-заочно	\N	student27	$argon2id$v=19$m=65536,t=3,p=4$ckE4L8Znnix3WzCnuOrfVw$oiEBi2QEnJMLwFRfBuX6Thc1SaKNDTaTst5muktDCmQ	\N	\N
43	5724564	Васильева Ева Матвеевна	student40@mail.ru	БТПб-20-1	Институт архитектуры, строительства и дизайна	\N	\N	\N	Очно-заочно	\N	student40	$argon2id$v=19$m=65536,t=3,p=4$GMmcynaWPbLXcesC1PslKg$UixWhm1fzNGLHq6qPl+fdWnU9eSBlWmPnhuMmBEFewc	\N	\N
44	1152785	Сахарова Елизавета Михайловна	student41@mail.ru	ДСб-20-1	Институт информационных технологий и анализа данных	\N	\N	\N	Очно	\N	student41	$argon2id$v=19$m=65536,t=3,p=4$xZ434bJJPMVGgZsu+s60ag$+zwqWEDKti820k8oKb5h8ZSnDroHlXbVRw6LelD1NPw	\N	\N
45	8478814	Иванов Роман Павлович	student42@mail.ru	ТХб-19-2	Институт недропользования	\N	\N	\N	Очно-заочно	\N	student42	$argon2id$v=19$m=65536,t=3,p=4$0TGlpHiW2m/6TXsVzou55w$eRI1uaa1kSeRGG4a4ja+CCWq3v7hrgr4/7iKAPbBmgM	\N	\N
47	1427080	Семенова Алиса Андреевна	student44@mail.ru	БТПб-20-1	Институт недропользования	\N	\N	\N	Очно	\N	student44	$argon2id$v=19$m=65536,t=3,p=4$gThtcvFGaWy1uAd6Cd1I6A$9gY0ztaEBPgnL2XtzstXHigba2j0wW0tjRS5SN7fqDA	\N	\N
36	8474036	Ермаков Никита Артёмович	student33@mail.ru	ДСб-20-1	Институт высоких технологий	\N	\N	\N	Очно	\N	student33	$argon2id$v=19$m=65536,t=3,p=4$pmjPY6xF01pj814T07Pwmw$mdLhx47871t4CSYI6HpVk8M0fjPtlERDYmslnMBjKUk	\N	\N
46	1956979	Киселев Ярослав Александрович	student43@mail.ru	ДСб-20-1	Институт информационных технологий и анализа данных	\N	\N	\N	Очно	\N	student43	$argon2id$v=19$m=65536,t=3,p=4$G9tbVCnuoH1Yp4F7CQJ8Fg$QlFTBt6JmR2eGyijIYF/ELeDb02bJCBvKeNJdnphu8o	\N	\N
35	9894440	Иванова Николь Марковна	student32@mail.ru	ТХб-19-2	Институт авиамашиностроения и транспорта	\N	\N	\N	Очно-заочно	\N	student32	$argon2id$v=19$m=65536,t=3,p=4$j+S8brFnCE2ITr29o10MOQ$HpIGhcB8ITFEPTjhdnY9yDNuZ0mQ+l81vvN2/n80l5E	\N	\N
38	5404539	Савельев Валерий Иванович	student35@mail.ru	ТХб-19-2	Институт высоких технологий	\N	\N	\N	Очно-заочно	\N	student35	$argon2id$v=19$m=65536,t=3,p=4$Pea/chqVfP3dKGm6MHP+zg$Idv2YCf/bYqn5h4Ms0y+YXfgOjGNG3NzE3WxMUW36sw	\N	\N
41	9419568	Кузнецов Дмитрий Владиславович	student38@mail.ru	ТХб-19-2	Институт архитектуры, строительства и дизайна	\N	\N	\N	Очно-заочно	\N	student38	$argon2id$v=19$m=65536,t=3,p=4$67lh2lSpyyTimGRzaAAbKg$HxaBIeIyVCXSOioUngvW1KxdeWPWoFR0L/kmMrVWTeU	\N	\N
42	1411466	Филиппов Даниил Богданович	student39@mail.ru	ИСТб-19-2	Институт информационных технологий и анализа данных	\N	\N	\N	Очно	\N	student39	$argon2id$v=19$m=65536,t=3,p=4$U3BBqhuHyA8Hs7mbzrDMpA$mfdv8TLswjKp+X5uY9GZhOWELPdWQOyifKKtEc7i0tw	\N	\N
52	1180318	Самсонов Кирилл Львович	student49@mail.ru	ИСТб-19-2	Институт высоких технологий	\N	\N	\N	Очно-заочно	\N	student49	$argon2id$v=19$m=65536,t=3,p=4$fzgiV5mgFmHCdrUsf/XG1w$CiLgR1Lb8Y7Fp8oTbAVl82RG3B5/Ffvtcd+sWVjiWs8	\N	\N
49	6048369	Позднякова Вероника Алиевна	student46@mail.ru	ТХб-19-2	Институт архитектуры, строительства и дизайна	\N	\N	\N	Очно-заочно	\N	student46	$argon2id$v=19$m=65536,t=3,p=4$w4pttugQ7Flcu5vfVRhOQw$idS+LzgXFIAavojyEfERRfNyrR/IzerThsMMRfyJX5g	\N	\N
51	3698783	Новикова София Тимофеевна	student48@mail.ru	БТПб-20-1	Институт недропользования	\N	\N	\N	Очно	\N	student48	$argon2id$v=19$m=65536,t=3,p=4$nnoNSOgiXswMMG6JUkMdrA$/X8UZSmmuyuV6WdXtHkOKAGXNuU/N4fdqrwbxzZCwM0	\N	\N
57	\N	Кравцова Елизавета Глебовна	directorTeam1@mail.ru	\N	\N	\N	\N	\N	\N	can view reports team	directorTeam1	$argon2id$v=19$m=65536,t=3,p=4$O9RIhKapseq+1Yp6wcBIOQ$zpOyvQOd+cGsv+fGLav4Y7ON8ofK05N3AJ8Fm9KmgFI	\N	\N
55	\N	Цветков Марсель Степанович	bossTeam@mail.ru	\N	\N	\N	\N	\N	\N	can view reports team	bossTeam	$argon2id$v=19$m=65536,t=3,p=4$eYagnHph8wdEB0R0QMTlMw$RvRIdnvaS9BpPGt0+I6NmHqqO5D3dD4ethpHp92rlNA	\N	\N
48	8724790	Соколов Макар Миронович	student45@mail.ru	ТХб-19-2	Институт авиамашиностроения и транспорта	\N	\N	\N	Очно-заочно	\N	student45	$argon2id$v=19$m=65536,t=3,p=4$Hnv/2CCGi2+UIS/eNnxX0Q$qe+yi5l7MqXK+3YvCokW8gIh8cTtvYtXd+W9OtOCMGo	\N	\N
34	1196395	Баранова Варвара Владиславовна	student31@mail.ru	ТХб-19-2	Институт авиамашиностроения и транспорта	\N	\N	\N	Очно-заочно	\N	student31	$argon2id$v=19$m=65536,t=3,p=4$yupcJLQVCBi8WR4u0HjAEA$I52nvNkQrJuTqCXk5bNMqnCZ+ditGbbDtbTJ5oGze+4	\N	\N
50	2595058	Соболев Никита Львович	student47@mail.ru	УПКм-22-1	Институт информационных технологий и анализа данных	\N	\N	\N	Очно-заочно	\N	student47	$argon2id$v=19$m=65536,t=3,p=4$LA7+16+7ZqemIEXKm9tleg$B9jn/1weHy1Ung7UeWeIXBiyUDExEXfprcs/txF+MvM	\N	\N
37	5269064	Голованова Вера Павловна	student34@mail.ru	ТХб-19-2	Институт информационных технологий и анализа данных	\N	\N	\N	Очно-заочно	\N	student34	$argon2id$v=19$m=65536,t=3,p=4$tsoGvbkyzTMeY+07QsdTMg$QLlORp600Hpngl5Njc4AhyWNk8jooQr234pkAjqPO88	\N	\N
39	3285321	Гончаров Фёдор Витальевич	student36@mail.ru	ИСТб-19-2	Институт недропользования	\N	\N	\N	Очно	\N	student36	$argon2id$v=19$m=65536,t=3,p=4$bYeMwBHpLhHz58UVXvbsbw$fdCpfZKabc5igCdV19qhmnlhLpeA+2Fhyj9PK239dW8	\N	\N
40	8819356	Иванов Степан Максимович	student37@mail.ru	ЛМБм-21-1	Институт авиамашиностроения и транспорта	\N	\N	\N	Очно	\N	student37	$argon2id$v=19$m=65536,t=3,p=4$XIe8uk9w7F0Ii8Qw244Ygg$XSPWoCbHZnCBc4Y5zOVVzh9IXR0MoAnGbB8cznr3H9o	\N	\N
56	\N	Гордеева Кира Кирилловна	bossUniversity@mail.ru	\N	\N	\N	\N	\N	\N	can view directions,can view reports directions,can create teams,can view reports teams	bossUniversity	$argon2id$v=19$m=65536,t=3,p=4$eYagnHph8wdEB0R0QMTlMw$RvRIdnvaS9BpPGt0+I6NmHqqO5D3dD4ethpHp92rlNA	\N	\N
61	\N	Калинина Мария Ильинична	directorTeam5@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam5	$argon2id$v=19$m=65536,t=3,p=4$+NKDwuXgwT6DQhaG7VGf0A$LUr4MT7hSr82WDcsM0HsqhT2n9eZDgGg5X5JcRvKyf0	\N	\N
62	\N	Никифорова Анна Данииловна	directorTeam6@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam6	$argon2id$v=19$m=65536,t=3,p=4$U2KFw5MSEX1Rl+4ipsa78w$yU583Z8WxO0vehzLgsCyrqiiKGume5QidZ4vq55/TGs	\N	\N
63	\N	Чернышев Лев Захарович	directorTeam7@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam7	$argon2id$v=19$m=65536,t=3,p=4$2jPjLPEdUZ33xddLfhMZ0A$QgxE8+25z2pWQJNkS18ts471PxS3OL49kdjG/kn4tBY	\N	\N
64	\N	Галкина Виктория Львовна	directorTeam8@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam8	$argon2id$v=19$m=65536,t=3,p=4$Nof8Y8xRjQ2BZ7Z8/hawTA$40lVttP6FTi2bhtnwWphX48yOUJAFegTlhWL0HpdGhU	\N	\N
65	\N	Давыдова Мия Александровна	directorTeam9@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam9	$argon2id$v=19$m=65536,t=3,p=4$HGusMXIk0bn4AGR1PLHLjw$qq3Ptgxp0TuGodNTaYw6ISgiTlIgw+G6F4DhYWntT4Q	\N	\N
66	\N	Козлова Диана Максимовна	directorTeam10@mail.ru	\N	\N	\N	\N	\N	\N	\N	directorTeam10	$argon2id$v=19$m=65536,t=3,p=4$8XVu+d+keDv0cIjmTFsleQ$qcOyCQd8iDglPQaP8HDQ0AAx+BmF/hWkhumQ2NXJP64	\N	\N
54	\N	Агафонова Алиса Денисовна	bossDirections@mail.ru	\N	\N	\N	\N	\N	\N	can create teams,can view reports teams	bossDirections	$argon2id$v=19$m=65536,t=3,p=4$eYagnHph8wdEB0R0QMTlMw$RvRIdnvaS9BpPGt0+I6NmHqqO5D3dD4ethpHp92rlNA	\N	\N
58	\N	Ермакова Таисия Ивановна	directorTeam2@mail.ru	\N	\N	\N	\N	\N	\N	can view reports team	directorTeam2	$argon2id$v=19$m=65536,t=3,p=4$ZAGEHCX8YO/A5A6QBvX7GA$JlD/r1xx6szDUwaEnptilCX840YjV1CAU+E9a9WBdk4	\N	\N
59	\N	Пономарев Иван Робертович	directorTeam3@mail.ru	\N	\N	\N	\N	\N	\N	can view reports team	directorTeam3	$argon2id$v=19$m=65536,t=3,p=4$lmEUM6G/qkPWvPyxbwE9Bg$JWFB2Dlmm3q5LFXaf8CP72decxtHsVhZcBgvJW1m9fA	\N	\N
60	\N	Фролова София Саввична	directorTeam4@mail.ru	\N	\N	\N	\N	\N	\N	can view reports team	directorTeam4	$argon2id$v=19$m=65536,t=3,p=4$lS9GmRyOnaFimskXpLyt0w$yMRKLqKDDb0wYu7L9iD1sJWiXkQPHtesPy71EqVO87o	\N	\N
\.


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 231
-- Name: achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.achievements_id_seq', 1, false);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 229
-- Name: dictionary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dictionary_id_seq', 10, true);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 210
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 14, true);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 212
-- Name: form_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.form_fields_id_seq', 11, true);


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 214
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forms_id_seq', 1, true);


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 216
-- Name: functions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.functions_id_seq', 77, true);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 218
-- Name: journals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.journals_id_seq', 7, true);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 220
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 32, true);


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 222
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 42, true);


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 224
-- Name: user_forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_forms_id_seq', 1, true);


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_functions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_functions_id_seq', 147, true);


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 66, true);


--
-- TOC entry 3260 (class 2606 OID 28145)
-- Name: journals PK_157a30136385dd81cdd19111380; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT "PK_157a30136385dd81cdd19111380" PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 28147)
-- Name: user_functions PK_1b04a9e32d9511b33fe11b6ffda; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda" PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 28297)
-- Name: achievements PK_1bc19c37c6249f70186f318d71d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 28149)
-- Name: functions PK_203889d2ae5a98ffc137739301e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 28151)
-- Name: events PK_40731c7151fe4be3116e45ddf73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 28153)
-- Name: user_forms PK_4e83554892a57d53117dc9a12bf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "PK_4e83554892a57d53117dc9a12bf" PRIMARY KEY (id, date);


--
-- TOC entry 3264 (class 2606 OID 28155)
-- Name: teams PK_7e5523774a38b08a6236d322403; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 28157)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 28159)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 28161)
-- Name: forms PK_ba062fd30b06814a60756f233da; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 28253)
-- Name: dictionary PK_d17df343bd5d01ed62dd0e55e4a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionary
    ADD CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a" PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 28165)
-- Name: form_fields PK_dc4b73290f2926c3a7d7c92d1e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 28313)
-- Name: achievements FK_0c0cd24bc6e722c12cd45750434; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3280 (class 2606 OID 28279)
-- Name: events FK_12ab9fec0ea7a5c0bd47f244fb7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_12ab9fec0ea7a5c0bd47f244fb7" FOREIGN KEY (clarifying_direction_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3284 (class 2606 OID 28166)
-- Name: journals FK_1b4d28fa4b326ecc43128e7d05b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT "FK_1b4d28fa4b326ecc43128e7d05b" FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 3294 (class 2606 OID 28308)
-- Name: achievements FK_2888c1257c41913030b59369f96; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT "FK_2888c1257c41913030b59369f96" FOREIGN KEY (type_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3293 (class 2606 OID 28303)
-- Name: achievements FK_3e7e91763bdef262e9f727a1208; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT "FK_3e7e91763bdef262e9f727a1208" FOREIGN KEY (status_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3290 (class 2606 OID 28171)
-- Name: user_functions FK_414c47660792aa509c8f55adc7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3283 (class 2606 OID 28176)
-- Name: functions FK_579f1e0cdab39bd43464fb882be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 3285 (class 2606 OID 28181)
-- Name: journals FK_811c873435715b3eb624d256a11; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT "FK_811c873435715b3eb624d256a11" FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- TOC entry 3281 (class 2606 OID 28284)
-- Name: events FK_9025d02effbcfec592d24236f5c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_9025d02effbcfec592d24236f5c" FOREIGN KEY (character_event_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3282 (class 2606 OID 28191)
-- Name: forms FK_b8df7e99e28d225024e56783b8e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 3278 (class 2606 OID 28269)
-- Name: events FK_b935d793584366f2a3c196ac9d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_b935d793584366f2a3c196ac9d7" FOREIGN KEY (type_participation_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3291 (class 2606 OID 28196)
-- Name: user_functions FK_bc78d14d218fc2e57e7a6941ab3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY (function_id) REFERENCES public.functions(id);


--
-- TOC entry 3275 (class 2606 OID 28254)
-- Name: events FK_bcb2ce0072504d624725e3ef826; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_bcb2ce0072504d624725e3ef826" FOREIGN KEY (type_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3277 (class 2606 OID 28264)
-- Name: events FK_bf2f38672c0046c6328e69b71e6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_bf2f38672c0046c6328e69b71e6" FOREIGN KEY (direction_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3287 (class 2606 OID 28201)
-- Name: teams FK_c0b0c479964469ab9fbbed02c8d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d" FOREIGN KEY (id_parent) REFERENCES public.teams(id);


--
-- TOC entry 3276 (class 2606 OID 28259)
-- Name: events FK_c5a362fc7d682923a6aa8f0072f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_c5a362fc7d682923a6aa8f0072f" FOREIGN KEY (level_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3288 (class 2606 OID 28211)
-- Name: user_forms FK_dc8c58310d9794b123b514516a3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3286 (class 2606 OID 28216)
-- Name: journals FK_dcd8f26897887ea1ca19e9b910a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3292 (class 2606 OID 28298)
-- Name: achievements FK_e2c799e4fa523f355079e1b06c0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT "FK_e2c799e4fa523f355079e1b06c0" FOREIGN KEY (direction_id) REFERENCES public.dictionary(id);


--
-- TOC entry 3289 (class 2606 OID 28221)
-- Name: user_forms FK_f8a70ba3fd198a242c1f76737aa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa" FOREIGN KEY (field_id) REFERENCES public.form_fields(id);


--
-- TOC entry 3279 (class 2606 OID 28274)
-- Name: events FK_fb98daef5570cb124e34c9ea42c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_fb98daef5570cb124e34c9ea42c" FOREIGN KEY (format_id) REFERENCES public.dictionary(id);


-- Completed on 2023-04-24 17:13:13

--
-- PostgreSQL database dump complete
--

