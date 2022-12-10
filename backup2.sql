--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-12-10 18:59:06

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

ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa";
ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3";
ALTER TABLE ONLY public.functions DROP CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a";
ALTER TABLE ONLY public.teams DROP CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3";
ALTER TABLE ONLY public.forms DROP CONSTRAINT "FK_b8df7e99e28d225024e56783b8e";
ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_9c113178e30b117d4ec1db45691";
ALTER TABLE ONLY public.functions DROP CONSTRAINT "FK_579f1e0cdab39bd43464fb882be";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f";
ALTER TABLE ONLY public.form_fields DROP CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
ALTER TABLE ONLY public.forms DROP CONSTRAINT "PK_ba062fd30b06814a60756f233da";
ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE ONLY public.teams DROP CONSTRAINT "PK_7e5523774a38b08a6236d322403";
ALTER TABLE ONLY public.user_forms DROP CONSTRAINT "PK_4e83554892a57d53117dc9a12bf";
ALTER TABLE ONLY public.events DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73";
ALTER TABLE ONLY public.functions DROP CONSTRAINT "PK_203889d2ae5a98ffc137739301e";
ALTER TABLE ONLY public.user_functions DROP CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.user_functions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.user_forms ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.teams ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.functions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.forms ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.form_fields ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.user_functions_id_seq;
DROP TABLE public.user_functions;
DROP SEQUENCE public.user_forms_id_seq;
DROP TABLE public.user_forms;
DROP SEQUENCE public.teams_id_seq;
DROP TABLE public.teams;
DROP SEQUENCE public.roles_id_seq;
DROP TABLE public.roles;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP SEQUENCE public.functions_id_seq;
DROP TABLE public.functions;
DROP SEQUENCE public.forms_id_seq;
DROP TABLE public.forms;
DROP SEQUENCE public.form_fields_id_seq;
DROP TABLE public.form_fields;
DROP SEQUENCE public.events_id_seq;
DROP TABLE public.events;
DROP TYPE public.teams_type_team_enum;
DROP TYPE public.functions_type_function_enum;
--
-- TOC entry 853 (class 1247 OID 34736)
-- Name: functions_type_function_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.functions_type_function_enum AS ENUM (
    'general',
    'special'
);


ALTER TYPE public.functions_type_function_enum OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 34870)
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
-- TOC entry 212 (class 1259 OID 34700)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    type character varying NOT NULL,
    title character varying NOT NULL,
    users_id text NOT NULL,
    "dateStart" timestamp without time zone NOT NULL,
    "dateEnd" timestamp without time zone NOT NULL,
    description character varying NOT NULL,
    image character varying NOT NULL,
    size character varying NOT NULL,
    repeat boolean NOT NULL,
    tags text NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 34699)
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
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 211
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 224 (class 1259 OID 34768)
-- Name: form_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_fields (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.form_fields OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 34767)
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
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 223
-- Name: form_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.form_fields_id_seq OWNED BY public.form_fields.id;


--
-- TOC entry 228 (class 1259 OID 34786)
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
-- TOC entry 227 (class 1259 OID 34785)
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
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 227
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- TOC entry 218 (class 1259 OID 34742)
-- Name: functions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.functions (
    id integer NOT NULL,
    title character varying NOT NULL,
    type_function public.functions_type_function_enum DEFAULT 'special'::public.functions_type_function_enum NOT NULL,
    team_id integer,
    "roleIdId" integer
);


ALTER TABLE public.functions OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 34741)
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
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 217
-- Name: functions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.functions_id_seq OWNED BY public.functions.id;


--
-- TOC entry 210 (class 1259 OID 34311)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 34310)
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
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 214 (class 1259 OID 34709)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    title character varying NOT NULL,
    permissions text NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 34708)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 213
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 216 (class 1259 OID 34726)
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
    type_team public.teams_type_team_enum
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 34725)
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
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 215
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- TOC entry 226 (class 1259 OID 34777)
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
-- TOC entry 225 (class 1259 OID 34776)
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
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_forms_id_seq OWNED BY public.user_forms.id;


--
-- TOC entry 220 (class 1259 OID 34752)
-- Name: user_functions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_functions (
    id integer NOT NULL,
    "dateStart" timestamp without time zone NOT NULL,
    "dateEnd" timestamp without time zone NOT NULL,
    function_id integer,
    user_id integer
);


ALTER TABLE public.user_functions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34751)
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
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_functions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_functions_id_seq OWNED BY public.user_functions.id;


--
-- TOC entry 222 (class 1259 OID 34759)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    studnumber integer NOT NULL,
    fullname character varying NOT NULL,
    email character varying NOT NULL,
    education_group character varying NOT NULL,
    institute character varying NOT NULL,
    gender character varying NOT NULL,
    phone character varying NOT NULL,
    birthdate date NOT NULL,
    type_time_study character varying NOT NULL,
    permissions text NOT NULL,
    title_role integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34758)
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
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3216 (class 2604 OID 34703)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 34771)
-- Name: form_fields id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_fields ALTER COLUMN id SET DEFAULT nextval('public.form_fields_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 34789)
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 34745)
-- Name: functions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions ALTER COLUMN id SET DEFAULT nextval('public.functions_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 34314)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 34712)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 34729)
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 34780)
-- Name: user_forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms ALTER COLUMN id SET DEFAULT nextval('public.user_forms_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 34755)
-- Name: user_functions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions ALTER COLUMN id SET DEFAULT nextval('public.user_functions_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 34762)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3397 (class 0 OID 34700)
-- Dependencies: 212
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, type, title, users_id, "dateStart", "dateEnd", description, image, size, repeat, tags) FROM stdin;
1	праздник	Развлекалово	1	2022-01-01 00:00:00	2022-01-02 00:00:00	Тут веселье, танцы и пляски	/image.jpg	внутри политеха	t	Весело\nКруто\nЖесть
2	конкурс	Очумелые ручки	2	2022-02-02 00:00:00	2022-02-03 00:00:00	Тут жарят уток	/image.jpg	внутри коллектива	f	Утки\nКулинария\nЖесть
3	соревнование	Турнир по доте	3	2022-03-03 00:00:00	2022-03-04 00:00:00	Тут играют на жизнь	/image.jpg	внутри политеха	t	Дота\nКиберспорт\nЖесть
4	праздник	День рождения Алексея Говоркова	4	2022-12-04 00:00:00	2022-12-04 00:00:00	У лучшего директора института день рождения	/image.jpg	внутри политеха	t	День рождения\nДиректор\nЖесть\n
5	соревнование	Турик по покеру	5	2022-05-05 00:00:00	2022-05-06 00:00:00	Тут играют на деньги	/image.jpg	внутри политеха	t	Покер\nДеньги\nАзарт
\.


--
-- TOC entry 3409 (class 0 OID 34768)
-- Dependencies: 224
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
-- TOC entry 3413 (class 0 OID 34786)
-- Dependencies: 228
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, date, description, fields_id, team_id) FROM stdin;
1	2017-05-09 00:00:00	Это форма для вступления в науку	1\n2\n3\n4\n5\n6	6
2	2017-05-09 00:00:00	Это форма для вступления в баскетбольный клуб	1\n2\n3\n4\n5\n6	8
\.


--
-- TOC entry 3403 (class 0 OID 34742)
-- Dependencies: 218
-- Data for Name: functions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.functions (id, title, type_function, team_id, "roleIdId") FROM stdin;
1	Руководитель	general	6	1
2	Участник	general	7	2
3	Организатор	general	8	3
4	Зам. Руководителя	general	9	4
5	Генератор идей	general	10	5
\.


--
-- TOC entry 3395 (class 0 OID 34311)
-- Dependencies: 210
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
22	1670203838600	auto1670203838600
\.


--
-- TOC entry 3399 (class 0 OID 34709)
-- Dependencies: 214
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, title, permissions) FROM stdin;
1	Суперадмин	can all
2	Руководитель	can all
3	Ответсвенный	can all
4	Ответсвенный за ИРНИТУ	can all
5	Участник	can all
\.


--
-- TOC entry 3401 (class 0 OID 34726)
-- Dependencies: 216
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (id, title, creation_date, image, tags, description, shortname, id_parent, type_team) FROM stdin;
2	Наука	2010-05-09 00:00:00	/image_scince.jpg	наука\nизучение	Научное направление	Наука	1	direction
3	Спорт	2010-05-09 00:00:00	/image_sport.jpg	спорт\nсоревнование	Спортивное направление	Спорт	1	direction
4	Общесвенная деятельность	2010-05-09 00:00:00	/image_social.jpg	танцы\nпесни\nмузыка	Общесвенное направление	Общество	1	direction
6	Студенческое научное общество «Квантум»	2011-05-09 00:00:00	/image_scince.jpg	изучение\nисследование	Изучение чего-нибудь, написание статьей	Наука	2	teams
1	ИРНИТУ	2010-05-09 00:00:00	/image.jpg	лучший университет	Иркутский Национальный Исследовательский Технический Институт	ПОЛИТЕХ	\N	university
5	Культурная массовая деятельность	2010-05-09 00:00:00	/image_culture.jpg	танцы\nпесни\nмузыка	Культурная деятельность	Культура	1	direction
10	Студенческие отряды	2011-05-09 00:00:00	/image_otryd.jpg	Стройка\nработа\nжесть	Тут помогут найти работу(игра в строителей)	СтудОтряды	4	teams
11	Добровольцы	2011-05-09 00:00:00	/image_dobro.jpg	Добро\nработа\nжесть\nволонтерство\nбобры	Тут работают за спасибо\\бесплатно (работаем 25/7)	Страдание	4	teams
12	Интеллектуальный клуб студентов	2011-05-09 00:00:00	/image_iks.jpg	Умники\nумницы\nжесть\niq\nигры	Тут есть "Что? Где? Когда?"(Почему?)	ИКС	4	teams
14	Учеба	2010-05-09 00:00:00	/image_study.jpg	учеба\nстатьи	учеба	учеба	1	teams
7	Гиревой спорт	2011-05-09 00:00:00	/image_sport.jpg	тяжелая атлетика\nспорт	Тягаем железо	Гиревой	3	teams
8	Баскетбол юноши	2011-05-09 00:00:00	/image_sport.jpg	Баскетбол\nспорт	Игра в Баскетбол	Баскетбол	3	teams
9	Волейбол юноши	2011-05-09 00:00:00	/image_sport.jpg	Волейбол\nспорт	Игра в Волейбол	Волейбол	3	teams
15	Народный коллектив ансамбль русской песни "Калина"	2011-05-09 00:00:00	/image_kt.jpg	Развлечение\nЖесть	Тут играют на нервах(барабанах)	Калина	5	teams
16	Танцевально-спортивный клуб «Академик». Народный коллектив Ансамбль бального танца «Академик»	2011-05-09 00:00:00	/image_kt.jpg	Развлечение\nЖесть	Тут танцуют на нервах(могилах)	Академик	5	teams
17	Народный театр «Предместье»	2011-05-09 00:00:00	/image_kt.jpg	Развлечение\nЖесть	Теаатр	Предместье	5	teams
\.


--
-- TOC entry 3411 (class 0 OID 34777)
-- Dependencies: 226
-- Data for Name: user_forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_forms (id, date, value, field_id, user_id) FROM stdin;
1	2020-09-05 00:00:00	Да все верно, а как вы узнали?	1	1
3	2020-09-05 00:00:00	Да все верно, а как вы узнали?	3	3
4	2020-09-05 00:00:00	Да все верно, а как вы узнали?	4	4
2	2020-09-05 00:00:00	Да все верно, а как вы узнали?	2	2
\.


--
-- TOC entry 3405 (class 0 OID 34752)
-- Dependencies: 220
-- Data for Name: user_functions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_functions (id, "dateStart", "dateEnd", function_id, user_id) FROM stdin;
1	2020-09-01 00:00:00	2021-08-01 00:00:00	1	1
2	2020-09-01 00:00:00	2021-08-01 00:00:00	2	2
3	2020-09-01 00:00:00	2021-08-01 00:00:00	3	3
4	2020-09-01 00:00:00	2021-08-01 00:00:00	4	4
5	2020-09-01 00:00:00	2021-08-01 00:00:00	5	5
\.


--
-- TOC entry 3407 (class 0 OID 34759)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, studnumber, fullname, email, education_group, institute, gender, phone, birthdate, type_time_study, permissions, title_role) FROM stdin;
1	2354354	Олег Олгов Олегович	oleg2222@mail.ru	ИСТб-20-4	ИИИТиАД	муж.	+79505553535	2002-01-01	Очно	can all	1
2	3546735	Игорь Игорев Игоревич	igor3333@gmail.com	ИСТб-20-1	ИИИТиАД	муж.	+79501112323	2002-02-02	Очно	can all	2
3	5678644	Любовь Любововна Олеговна	lubov4444@yandex.ru	ИСТб-20-3	ИИИТиАД	жен.	+79506663311	2002-03-03	Заочно	can all	3
4	9534531	Ольга Ольговна Олеговна	olga5555@mail.ru	ИСТб-20-2	ИИИТиАД	жен.	+79507984512	2002-04-04	Заочно	can all	4
5	6543176	Ярополк Ярорлков Ярополкович	yaropolk6666@gmail.com	ИСТб-20-5	ИИИТиАД	муж.	+79502251917	2002-05-05	Очно-Заочно	can all	5
\.


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 211
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 223
-- Name: form_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.form_fields_id_seq', 11, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 227
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forms_id_seq', 1, true);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 217
-- Name: functions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.functions_id_seq', 1, false);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 22, true);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 213
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 215
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_id_seq', 17, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_forms_id_seq', 1, true);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_functions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_functions_id_seq', 1, true);


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3237 (class 2606 OID 34757)
-- Name: user_functions PK_1b04a9e32d9511b33fe11b6ffda; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "PK_1b04a9e32d9511b33fe11b6ffda" PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 34750)
-- Name: functions PK_203889d2ae5a98ffc137739301e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 34707)
-- Name: events PK_40731c7151fe4be3116e45ddf73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 34784)
-- Name: user_forms PK_4e83554892a57d53117dc9a12bf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "PK_4e83554892a57d53117dc9a12bf" PRIMARY KEY (id, date);


--
-- TOC entry 3233 (class 2606 OID 34734)
-- Name: teams PK_7e5523774a38b08a6236d322403; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 34318)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 34766)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 34793)
-- Name: forms PK_ba062fd30b06814a60756f233da; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 34716)
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 34775)
-- Name: form_fields PK_dc4b73290f2926c3a7d7c92d1e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_fields
    ADD CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 34814)
-- Name: user_functions FK_414c47660792aa509c8f55adc7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3247 (class 2606 OID 34799)
-- Name: functions FK_579f1e0cdab39bd43464fb882be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT "FK_579f1e0cdab39bd43464fb882be" FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 3251 (class 2606 OID 34819)
-- Name: users FK_9c113178e30b117d4ec1db45691; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_9c113178e30b117d4ec1db45691" FOREIGN KEY (title_role) REFERENCES public.roles(id);


--
-- TOC entry 3254 (class 2606 OID 34834)
-- Name: forms FK_b8df7e99e28d225024e56783b8e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT "FK_b8df7e99e28d225024e56783b8e" FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- TOC entry 3249 (class 2606 OID 34809)
-- Name: user_functions FK_bc78d14d218fc2e57e7a6941ab3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_functions
    ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY (function_id) REFERENCES public.functions(id);


--
-- TOC entry 3246 (class 2606 OID 34794)
-- Name: teams FK_c0b0c479964469ab9fbbed02c8d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "FK_c0b0c479964469ab9fbbed02c8d" FOREIGN KEY (id_parent) REFERENCES public.teams(id);


--
-- TOC entry 3248 (class 2606 OID 34804)
-- Name: functions FK_c8b15425a585fcedc6b1f7f734a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.functions
    ADD CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a" FOREIGN KEY ("roleIdId") REFERENCES public.roles(id);


--
-- TOC entry 3253 (class 2606 OID 34829)
-- Name: user_forms FK_dc8c58310d9794b123b514516a3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3252 (class 2606 OID 34824)
-- Name: user_forms FK_f8a70ba3fd198a242c1f76737aa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_forms
    ADD CONSTRAINT "FK_f8a70ba3fd198a242c1f76737aa" FOREIGN KEY (field_id) REFERENCES public.form_fields(id);


-- Completed on 2022-12-10 18:59:06

--
-- PostgreSQL database dump complete
--

