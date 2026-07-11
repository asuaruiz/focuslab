const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = "https://mpewwrienpmpagcodhxn.supabase.co";
const supabaseServiceKey = "sbp_3f2a17e1d46cb540c397f8179444df189a4d097c";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const blogDataPath = path.join(__dirname, "blog-data.json");
const blogPosts = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));

async function insertPosts() {
  console.log("🚀 Iniciando inserción de blog posts...\n");

  let successful = 0;
  let failed = 0;

  for (const post of blogPosts) {
    try {
      const { data, error } = await supabase
        .from("focuslab_blog_posts")
        .insert(post)
        .select();

      if (error) {
        console.error(`❌ Error: ${post.title}`);
        console.error(`   ${error.message}\n`);
        failed++;
      } else {
        console.log(`✅ Insertado: ${post.title}`);
        successful++;
      }
    } catch (err) {
      console.error(`❌ Excepción: ${post.title}`);
      console.error(`   ${err.message}\n`);
      failed++;
    }
  }

  console.log(`\n📊 Resultado: ${successful} exitosos, ${failed} fallidos`);
  process.exit(failed > 0 ? 1 : 0);
}

insertPosts();
