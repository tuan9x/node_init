-- SQL RUN SET NEXTVAL AUTO INCREMENT
SELECT setval('category_id_seq', (SELECT MAX(id) FROM category));

--------------------------------------------------------------------------------------------- 
SELECT MAX(id) FROM post_cate); -- Get Current Max Id // 763
SELECT nextval('kind_web_id_seq'); -- Get Next Value ID Auto increament



-- ==========================================================================================

-- Change type colume table from "string" to "int"
ALTER TABLE users
ALTER COLUMN "role" TYPE INT 
USING "role"::integer;