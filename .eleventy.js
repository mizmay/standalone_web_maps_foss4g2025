const safeLinks = require("@sardine/eleventy-plugin-external-links");

module.exports = function(eleventyConfig) {
  // Copy CSS files to output (paths relative to input directory)
  // When input is "workshop", "workshop.css" refers to "workshop/workshop.css" from project root
  eleventyConfig.addPassthroughCopy("workshop.css");
  
  // Copy images directory to output (paths relative to input directory)
  // When input is "workshop", "images" refers to "workshop/images" from project root
  eleventyConfig.addPassthroughCopy("images");
  
  // Add external links plugin - automatically adds target="_blank" to external links
  eleventyConfig.addPlugin(safeLinks);
  
  // Filter to extract navigation links from content (last paragraph with Previous/Next links)
  // All nav links are preceded by <hr> (from --- in markdown)
  // Pattern matches both "Previous | Next" and single "Previous" or "Next" links
  eleventyConfig.addNunjucksFilter("extractNav", function(content) {
    if (!content) return { content: "", nav: "" };
    
    // Pattern to match navigation links - preceded by <hr>
    // Matches: <hr> followed by <p><strong>...Previous...Next...</strong></p> at end
    // Also matches single Previous or Next links
    const navPattern = /(\s*<hr>\s*<p><strong>.*?(?:Previous|Next).*?<\/strong><\/p>\s*)$/s;
    const match = content.match(navPattern);
    
    if (match) {
      return {
        content: content.replace(navPattern, "").trim(),
        nav: match[1].trim()
      };
    }
    
    return { content: content.trim(), nav: "" };
  });
  
  // Note: No path calculation filter needed - all pages are at same depth (step-XX/ subdirectories)
  // All paths use hardcoded ../ prefix
  
  // Note: lib and sources directories don't exist on this branch
  // They're only needed when attendees build their maps on main branch

  return {
    dir: {
      input: "workshop",
      output: "workshop",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};

