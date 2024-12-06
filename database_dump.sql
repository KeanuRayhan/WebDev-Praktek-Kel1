--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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
-- Name: enum_Movies_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Movies_status" AS ENUM (
    'approved',
    'unapproved'
);


ALTER TYPE public."enum_Movies_status" OWNER TO postgres;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

--
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.role OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status AS ENUM (
    'approved',
    'unapproved'
);


ALTER TYPE public.status OWNER TO postgres;

--
-- Name: actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actor_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Actor" (
    actor_id integer DEFAULT nextval('public.actor_id_seq'::regclass) NOT NULL,
    actor_name character varying,
    birth_date character varying,
    country_id integer,
    url_photo character varying
);


ALTER TABLE public."Actor" OWNER TO postgres;

--
-- Name: award_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.award_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.award_id_seq OWNER TO postgres;

--
-- Name: Award; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Award" (
    award_id integer DEFAULT nextval('public.award_id_seq'::regclass) NOT NULL,
    award_name character varying,
    year character varying,
    country_id integer,
    movie_id integer
);


ALTER TABLE public."Award" OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_id_seq OWNER TO postgres;

--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country" (
    country_id integer DEFAULT nextval('public.country_id_seq'::regclass) NOT NULL,
    country_name character varying
);


ALTER TABLE public."Country" OWNER TO postgres;

--
-- Name: genres_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_genre_id_seq OWNER TO postgres;

--
-- Name: Genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genres" (
    genre_id integer DEFAULT nextval('public.genres_genre_id_seq'::regclass) NOT NULL,
    genre character varying
);


ALTER TABLE public."Genres" OWNER TO postgres;

--
-- Name: Movie_actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie_actor" (
    movie_id integer,
    actor_id integer
);


ALTER TABLE public."Movie_actor" OWNER TO postgres;

--
-- Name: Movie_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie_genre" (
    movie_id integer,
    genre_id integer
);


ALTER TABLE public."Movie_genre" OWNER TO postgres;

--
-- Name: Movie_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie_genres" (
    movie_id integer,
    genre_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "GenreGenreId" integer NOT NULL,
    "MovieMovieId" integer NOT NULL
);


ALTER TABLE public."Movie_genres" OWNER TO postgres;

--
-- Name: Movie_platform; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movie_platform" (
    movie_id integer,
    platform_id integer
);


ALTER TABLE public."Movie_platform" OWNER TO postgres;

--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_id_seq OWNER TO postgres;

--
-- Name: Movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movies" (
    movie_id integer DEFAULT nextval('public.movie_id_seq'::regclass) NOT NULL,
    title character varying,
    url_photo character varying,
    year character varying,
    country_id integer,
    synopsis character varying,
    link_trailer character varying,
    status public.status,
    user_id integer,
    created_at timestamp without time zone,
    rating double precision
);


ALTER TABLE public."Movies" OWNER TO postgres;

--
-- Name: Platform; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Platform" (
    platform_id integer NOT NULL,
    platform character varying
);


ALTER TABLE public."Platform" OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_review_id_seq OWNER TO postgres;

--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reviews" (
    review_id integer DEFAULT nextval('public.reviews_review_id_seq'::regclass) NOT NULL,
    user_id integer,
    movie_id integer,
    comments character varying,
    status public.status,
    created_at timestamp without time zone,
    rating integer
);


ALTER TABLE public."Reviews" OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    role public.role,
    created_at timestamp without time zone,
    issuspended boolean DEFAULT false,
    google_id character varying(255)
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: actor__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actor__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actor__id_seq OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genre_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Data for Name: Actor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Actor" (actor_id, actor_name, birth_date, country_id, url_photo) FROM stdin;
3	Oscar Isaac	1979-03-09	3	1730520904180-134924275-oscar isaac.jpeg
7	Hugh Jackman	1968-10-12	1	1730520972224-981918490-hugh jackman.jpg
11	Timoth├⌐e Chalamet	1995-12-27	3	1730528087123-138649086-timothee_chalamet.jpg
2	Chris Evans	1981-06-13	1	1730516281649-427009778-ChrisEvans2023.jpg
12	Vin Diesel	1967-07-18	1	1731295920180-224838327-vin diesel.jpeg
13	Paul Walker	1973-09-12	1	1731296049899-87722358-paul walker.jpeg
14	Tyrese Gibson	1978-12-30	1	1731296535943-825410961-tyrese gibson.jpg
15	Daniel Radcliff	2024-11-14	2	1731298336587-220474719-vin diesel.jpeg
8	Ryan Reynolds	1976-10-23	1	1730513347115-304464678-ryanreynolds.jpg
1	Robert Downey Jr.	1965-04-04	1	1730518374446-545391351-robert downey.jpeg
4	Keanu Reeves	02-09-1964	1	1730520134499-429046112-keanu reeves.jpg
9	Tom Hardy	1977-09-15	2	1730520739699-583487683-tom hardy.jpg
\.


--
-- Data for Name: Award; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Award" (award_id, award_name, year, country_id, movie_id) FROM stdin;
1	2022 50th Anniversary Saturn Awards.	2022	1	1
2	2019 People's Choice Award untuk Film Terfavorit, MTV Movie & TV Award untuk Tokoh Antagon	2019	1	2
3	BAFTA	2023	2	3
4	OSCA 2022	2022	1	3
5	OSCAR 2022	2022	1	\N
6	OSCAR 2024	2024	1	\N
9	Testing 2026	2026	1	\N
14	LA FRANCE	2024	3	\N
11	Panasonic's Award	2024	5	\N
7	Testings 2024	2024	1	\N
13	TESTING INPUT MOVIE AWARD	2026	5	32
12	Panasonic's Award	2025	5	6
15	Test Award	2024	1	\N
8	Testing 2025	2025	1	96
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" (country_id, country_name) FROM stdin;
1	United States
2	United Kingodom
3	France
5	Indonesia
\.


--
-- Data for Name: Genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genres" (genre_id, genre) FROM stdin;
1	Action
2	Superhero
3	Comedy
5	Animation
6	Adventure
7	Fantasy
9	Romance
12	Mystery
14	Crime
\.


--
-- Data for Name: Movie_actor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie_actor" (movie_id, actor_id) FROM stdin;
1	3
2	1
2	2
3	11
6	11
6	3
32	3
32	2
95	12
95	13
95	14
96	12
96	13
96	14
94	13
94	12
\.


--
-- Data for Name: Movie_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie_genre" (movie_id, genre_id) FROM stdin;
1	1
1	2
1	7
2	1
2	2
2	6
3	6
4	1
5	2
7	1
8	2
9	6
10	6
12	1
13	2
14	7
15	1
16	2
17	6
18	6
20	1
21	2
22	7
23	1
28	1
29	2
30	7
6	1
6	3
6	7
32	9
32	1
95	1
96	1
96	3
96	6
96	2
94	1
94	14
\.


--
-- Data for Name: Movie_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie_genres" (movie_id, genre_id, "createdAt", "updatedAt", "GenreGenreId", "MovieMovieId") FROM stdin;
\.


--
-- Data for Name: Movie_platform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movie_platform" (movie_id, platform_id) FROM stdin;
1	1
2	1
3	1
4	1
5	1
7	1
8	1
9	1
10	1
12	1
13	2
14	2
15	2
16	2
17	2
18	2
20	2
21	2
22	2
23	2
28	2
29	3
30	3
6	3
6	1
32	3
32	2
95	2
96	2
96	3
94	2
\.


--
-- Data for Name: Movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movies" (movie_id, title, url_photo, year, country_id, synopsis, link_trailer, status, user_id, created_at, rating) FROM stdin;
8	Title 3	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	2	2024-09-23 00:00:00	0
3	Dune	uploads\\movies\\1730995794751.jpg	2021	1	A mythic and emotionally charged heros journey, Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people.	https://www.youtube.com/watch?v=n9xhJrPXop4	unapproved	1	\N	9
4	Movie 1	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2022	1	Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.	http://example.com/trailer1	approved	1	2024-09-23 00:00:00	0
5	Movie 2	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2019	1	After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.	http://example.com/trailer2	approved	2	2024-09-23 00:00:00	0
7	Title 2	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	2	2024-09-23 00:00:00	0
94	The Fast and the Furious	uploads\\movies\\1731296268259.jpg	2001	1	Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies rocks the area.	https://www.youtube.com/watch?v=2TAOizOnNPo	approved	\N	\N	0
9	Title 4	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	2	2024-09-23 00:00:00	0
10	Title 5	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	2	2024-09-23 00:00:00	0
12	Title 7	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
13	Title 8	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
14	Title 9	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
6	Title 1 (Updated)	uploads\\movies\\1731164245449.png	2020	1	lorem ipsum dolor sit amet (Updated)	\N	approved	2	2024-09-23 00:00:00	0
96	Fast and Furious 7	uploads\\movies\\1731298592440.jpg	2015	1	Testing synopsis		approved	\N	\N	0
2	Avenger : Endgame	uploads\\movies\\1730995702649.jpg	2019	1	After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.	https://www.youtube.com/watch?v=TcMBFSGVi1c&t=2s	approved	2	2024-09-23 00:00:00	9.3
1	Moon Knight	uploads\\movies\\1730995663585.jpeg	2022	1	Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.	https://www.youtube.com/watch?v=x7Krla_UxRg	approved	1	2024-09-23 00:00:00	8.5
16	Title 11	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
17	Title 12	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
18	Judul 1	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
20	Judul 3	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
21	Judul 4	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	unapproved	3	2024-09-23 00:00:00	0
22	Judul 5	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2024	2	lorem ipsum dolor sit amet	\N	unapproved	3	2024-09-23 00:00:00	0
23	Judul 6	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2024	2	lorem ipsum dolor sit amet	\N	unapproved	3	2024-09-23 00:00:00	0
28	Judul 11	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2024	3	lorem ipsum dolor sit amet	\N	unapproved	3	2024-09-23 00:00:00	0
29	Judul 12	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2024	3	lorem ipsum dolor sit amet	\N	unapproved	3	2024-09-23 00:00:00	0
30	Judul 13	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2024	3	lorem ipsum dolor sit amet	\N	unapproved	1	2024-09-23 00:00:00	0
32	Judul 15 (Updated)	uploads\\movies\\1730995879866.png	2024	1	lorem ipsum dolor sit amet (Updated)	https://www.youtube.com/watch?v=lMXh6vjiZrI	unapproved	1	2024-09-23 00:00:00	0
95	Fast & Furious 6	uploads\\movies\\1731296714542.jpg	2013	1	Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries, but Dominic unexpectedly gets sidetracked with facing his presumed deceased girlfriend, Letty.	https://www.youtube.com/watch?v=oc_P11PNvRs&t=10s	approved	\N	\N	0
15	Title 10	https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png	2020	1	lorem ipsum dolor sit amet	\N	approved	3	2024-09-23 00:00:00	0
\.


--
-- Data for Name: Platform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Platform" (platform_id, platform) FROM stdin;
1	Disney+
2	Netflix
3	HBO
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reviews" (review_id, user_id, movie_id, comments, status, created_at, rating) FROM stdin;
24	4	1	Series terbaik MCU ! Keren banget pokoknya	\N	\N	5
25	3	1	MOON KNIGHT ADALAH SERI STANDALONE MCU YANG HEBAT!\nSeseorang tidak perlu menonton proyek MCU lain sebelum menonton ini. Moon Knight pasti layak mendapatkan beberapa musim lagi.	\N	\N	5
26	5	1	Acara TV Marvel terbaik dengan mudah. Saya sangat terkesan dengan acara TV ini. Ada banyak hal hebat dalam pertunjukan ini.	\N	\N	4
27	6	1	Saya bingung, setelah menonton dan memberikan waktu pada acara ini untuk tenggelam dalam diri saya, saya menyadari betapa kenikmatan saya terhadap acara ini hanyalah hype.	\N	\N	3
28	6	2	Pokoknya tidak bisa digambarkan dengan kata-kata, ini adalah film yang benar-benar harus ditonton, siapapun yg belum nge fans, kalo nonton ini bakalan langsung nge fans sama tokoh-tokoh superhero nya. Thank you, Marvel for this epic movie Γ¥ñΓ¥ñΓ¥ñΓ¥ú	\N	\N	5
29	5	2	I think film ini terlalu banyak reunian antara hero nya..  Iklannya terlalu banyak..  Hanya di menit terakhir baru seru..  Selain itu...  O my GOD...  No	\N	\N	4
30	3	2	Film nya epic banget sumpah, pas nonton feel nya kaya kerasa aja gitu.	\N	\N	5
34	4	3	Filmnya bagus banget...!	\N	\N	5
37	3	3	Filmnya keren banget	\N	\N	4
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (user_id, username, email, password, role, created_at, issuspended, google_id) FROM stdin;
4	useradmin	useradmin@gmail.com	$2a$08$HEUjMNAxw0KGYiBXsev1T.4ne4Nm5YTsQrvJXyaTjAS2M3Pi0WAme	admin	\N	f	\N
5	useranonym2	useranonym2@mail.com	$2a$08$Z1WjLR.7SW5KZamDs9/SGen3nCztlBLksouP.NEV4z1em/7Q2O6tu	user	\N	f	\N
1	michael_jr	michaeljr@gmai.com	12345	user	2024-09-15 10:00:00	t	\N
2	jane123	jane@gmail.com	user	user	2024-09-15 10:00:00	t	\N
7	useranonym4	useranonym4@gmail.com	$2a$08$ai8qaEkFA0yx4vwqGeRip.hXCbJp/pJSaWEe0qEsdgVRN27UQ3CAm	user	\N	f	\N
3	useranonym	useranonym@gmail.com	$2a$08$rJJLzXfPxrNvrlPuYl.I3ec./k6jD6.7ad23ptGU8GkHd5vCbftRS	user	\N	f	\N
6	useranonym3	useranonym3@email.com	$2a$08$QxOGhbclQI7t45Ts.LNK9uKHdV4CWD/78eHez.s3HadlTe8BcIm0W	user	\N	t	\N
8	useranonym5	useranonym5@gmail.com	$2a$08$VGBcdGK7nUKKNE3Fe4AXmu9QwR06MEwnRxR9mFuj9qtEflnc2uPQq	user	\N	f	\N
9	keanu.rayhan.tif422	keanu.rayhan.tif422@polban.ac.id	\N	user	\N	f	110247756551587738139
10	keanu123	keanu@gmail.com	$2a$08$yTmS9jX8elfbOlrDORA2E.w8zMy2uu0W8203bGLM35SIWAwVqYA0.	user	\N	t	\N
\.


--
-- Name: actor__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actor__id_seq', 1, false);


--
-- Name: actor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actor_id_seq', 15, true);


--
-- Name: award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.award_id_seq', 15, true);


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_id_seq', 8, true);


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 6, true);


--
-- Name: genres_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_genre_id_seq', 14, true);


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 96, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 1, false);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 49, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- Name: Actor Actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_pkey" PRIMARY KEY (actor_id);


--
-- Name: Award Award_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_pkey" PRIMARY KEY (award_id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (country_id);


--
-- Name: Genres Genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres"
    ADD CONSTRAINT "Genres_pkey" PRIMARY KEY (genre_id);


--
-- Name: Movie_genres Movie_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genres"
    ADD CONSTRAINT "Movie_genres_pkey" PRIMARY KEY ("GenreGenreId", "MovieMovieId");


--
-- Name: Movies Movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_pkey" PRIMARY KEY (movie_id);


--
-- Name: Platform Platform_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Platform"
    ADD CONSTRAINT "Platform_pkey" PRIMARY KEY (platform_id);


--
-- Name: Reviews Reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (review_id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (user_id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Actor Actor_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Actor"
    ADD CONSTRAINT "Actor_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Country"(country_id);


--
-- Name: Award Award_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Country"(country_id);


--
-- Name: Award Award_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Award"
    ADD CONSTRAINT "Award_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Movie_actor Movie_actor_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_actor"
    ADD CONSTRAINT "Movie_actor_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES public."Actor"(actor_id);


--
-- Name: Movie_actor Movie_actor_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_actor"
    ADD CONSTRAINT "Movie_actor_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Movie_genre Movie_genre_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genre"
    ADD CONSTRAINT "Movie_genre_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public."Genres"(genre_id);


--
-- Name: Movie_genre Movie_genre_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genre"
    ADD CONSTRAINT "Movie_genre_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Movie_genres Movie_genres_GenreGenreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genres"
    ADD CONSTRAINT "Movie_genres_GenreGenreId_fkey" FOREIGN KEY ("GenreGenreId") REFERENCES public."Genres"(genre_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Movie_genres Movie_genres_MovieMovieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genres"
    ADD CONSTRAINT "Movie_genres_MovieMovieId_fkey" FOREIGN KEY ("MovieMovieId") REFERENCES public."Movies"(movie_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Movie_genres Movie_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genres"
    ADD CONSTRAINT "Movie_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public."Genres"(genre_id);


--
-- Name: Movie_genres Movie_genres_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_genres"
    ADD CONSTRAINT "Movie_genres_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Movie_platform Movie_platform_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_platform"
    ADD CONSTRAINT "Movie_platform_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Movie_platform Movie_platform_platform_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movie_platform"
    ADD CONSTRAINT "Movie_platform_platform_id_fkey" FOREIGN KEY (platform_id) REFERENCES public."Platform"(platform_id);


--
-- Name: Movies Movies_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Country"(country_id);


--
-- Name: Movies Movies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(user_id);


--
-- Name: Reviews Reviews_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_movie_id_fkey" FOREIGN KEY (movie_id) REFERENCES public."Movies"(movie_id);


--
-- Name: Reviews Reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(user_id);


--
-- PostgreSQL database dump complete
--

