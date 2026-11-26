# GED Now

A free, account-free learning studio for adults working toward Washington’s High School Equivalency Certificate. Start with typing and forms, choose any of four GED subject sets, or take an eight-question mixed check. Each result includes explanations. The mixed check samples the subject sets; these are original foundation exercises, not full-length exams or official readiness scores.

## Run it

**Live studio:** https://goldennftplatform-svg.github.io/gednow/

The Field Lab adds three interactive trails: read a bus timetable, check a paycheck, and reserve a computer lab session. Each includes three tasks, immediate explanations, and a completion stamp stored in the learner’s browser. Edit `public/lab.js` to update these sample documents and tasks.

1. Double-click `START-HERE.bat` in `C:\Users\PreSafu\Desktop\gednow`. The folder can also be copied to another Windows computer. Python 3 or Node.js is required on the host only.
2. Open **http://localhost:8012/** on the host. For a class on the same private Wi-Fi, use the second address printed by the launcher. Keep the server window open. If prompted by Windows Firewall, allow the host on the private network.
3. To stop serving, press Ctrl+C. Manual launch: `python server.py` or `node server.js`. Both serve only `public/`.

## Install and use offline

Open the studio on localhost or an HTTPS host and let the first load complete. In a supporting browser choose **Install app**, or **Share → Add to Home Screen** on iOS. Ordinary HTTP over Wi-Fi supports practice but not the offline worker. External Washington resources require internet access. For a public outreach site, deploy the contents of `public/` to an HTTPS static host.

Completed scores are stored in the current browser on the current site. A session in progress starts over when you leave the set or reload. On a shared outreach tablet, use **Clear results** between learners.

## Project map

- `original-abby123/`: copy of the original application files, including its screen layouts, assets, JavaScript, both servers and Windows launcher. No Git metadata. Kept outside the GED Now web root.
- `server.py`, `server.js`, `START-HERE.bat`: adapted Abby 123 serving and launch path. Port 8012 separates GED Now from the original on 8000.
- `public/index.html`, `style.css`, `studio.js`: accessible navigation, responsive screen layouts, practice and scoring.
- `public/lessons.js`: editable learning sets. Answers use zero-based choice indices, or text for typing tasks.
- `public/sw.js`, `manifest.webmanifest`, icons: offline shell and app installation. Increment the worker version after changing cached files.
- `WIREFRAMES.md`: original-to-adult screen map and outreach walkthrough.
