Our Lab Inventory site is a web application that uses Node Js, Express Js, and Mongodb (Atlas). 
# How To Install Software

### 1 Install Node.js (LTS) and NPM 
a.	In your terminal/command prompt, run these commands to see if you have Node and Npm: 
    
    i.	**node -v** and **npm -v**
    
    ii.	You should see something like “**v20.11.0 and 10.5.2**” 

b.	If not, you can download an installer for your system then run it and follow on screen instructions:
    
    i.	https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

### 2	Install Git
a.	Run this command to see if you have git installed: 
    
    i.	**git --version** 
    
    ii.	You should get a response like "**git version 2.33.0**" 

b.	If not, you will need to install git for your device:
    
    i.	(e.g., windows 64 bit) via: https://git-scm.com/downloads

c.	 Use all default settings. There are also tutorial videos for this on YouTube https://youtu.be/dqFJVEIJEU0?si=ZWT3sDrYuDu8fiaw

### 3	Setting up your local git repo with our remote repo:
a.	Use this command to make a copy of the remote repository so you can get stuff from it and send stuff to it. 
    
    i.	**git clone https://github.com/adamw1221/CS495-Lab-Inventory-Group-F.git**
    
    ii.	You should now have the folder **CS495-Lab-Inventory-Group-F**

b.	Navigate into that folder with command: **cd CS495-Lab-Inventory-Group-F**
c.	You should now see all of our application code hosted on our main branch on github.

### 4	Setting up a personal branch
This allows you to make changes to your own copy without affecting the main branch.
a.	From CS495-Lab-Inventory-Group-F, use this command: 
    
    i. **git checkout -b featureBranchName**
    
    ii. You should get a message saying that you switched to the new branch you just created. 
    
    iii. Now you are good to make changes to code and commit them: 
        1. See Sections 5 and 6
        2.git add .   (to stage all files that you’ve modified) 
    
    iv. When ready to locally “save” those changes use:
**git commit -m " code for this checkpoint"**
    
    v. To send them to your remote feature branch use: **git push origin featureBranchName** . The first time you do this your new branch will become visible on github  at https://github.com/adamw1221/CS495-Lab-Inventory-Group-F

### 5	Add Environment Variable File
This will connect the application to mongodb
a. Create a file named **.env** in the top lovel of folder **CS495-Lab-Inventory-Group-F**

b. Add this connection string:
    i. MONGODB_URI = mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority

c. Username: LabAdmin

d. password: kNvoF1iXUX3GAfzk