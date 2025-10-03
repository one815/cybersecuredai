#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function collect(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const fp = path.join(dir, f);
      const st = fs.statSync(fp);
      if (st.isDirectory()) collect(fp);
      else {
        try {
          const s = fs.readFileSync(fp, 'utf8');
          const re = /attached_assets\/([^"'\)\]\s>]+\.(?:png|jpg|jpeg|webp|gif|svg))/gi;
          let m;
          while ((m = re.exec(s))) {
            const target = path.join('attached_assets', m[1]);
            if (!fs.existsSync(target)) {
              fs.mkdirSync(path.dirname(target), { recursive: true });
              fs.writeFileSync(target, Buffer.from(''));
            }
          }
        } catch (e) {
          // ignore read failures (binary files, etc.)
        }
      }
    }
  } catch (e) {
    // ignore missing directories
  }
}

['client', 'server', 'shared', '.'].forEach((d) => {
  try {
    collect(d);
  } catch (e) {
    // ignore
  }
});
