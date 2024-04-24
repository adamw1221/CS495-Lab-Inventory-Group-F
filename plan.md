Our Lab Inventory site is a web application that uses Node Js, Express Js, and Mongodb (Atlas). 
# How To Install Software

### 1 Install Node.js (LTS) and NPM 
1.	In your terminal/command prompt, run these commands to see if you have Node and Npm: 

    1.	**node -v** and **npm -v**
       
    2.	You should see something like “**v20.11.0 and 10.5.2**” 

2.	If not, you can download an installer for your system then run it and follow on screen instructions:
    
    1.	https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

### 2	Install Git
1.	Run this command to see if you have git installed: 
    
    1.	**git --version** 
    
    2.	You should get a response like "**git version 2.33.0**" 

2.	If not, you will need to install git for your device:
    
    1.	(e.g., windows 64 bit) via: https://git-scm.com/downloads

3.  Use all default settings. There are also tutorial videos for this on YouTube     https://youtu.be/dqFJVEIJEU0?si=ZWT3sDrYuDu8fiaw

### 3	Setting up your local git repo with our remote repo:
1.	Use this command to make a copy of the remote repository so you can get stuff from it and send stuff to it. 
    
    2.	**git clone https://github.com/adamw1221/CS495-Lab-Inventory-Group-F.git**
    
    3.	You should now have the folder **CS495-Lab-Inventory-Group-F**

2.	Navigate into that folder with command: **cd CS495-Lab-Inventory-Group-F**
3.	You should now see all of our application code hosted on our main branch on github.

### 4	Setting up a personal branch
This allows you to make changes to your own copy without affecting the main branch.

1.	From CS495-Lab-Inventory-Group-F, use this command: 
    
    1. **git checkout -b featureBranchName**
    
    2. You should get a message saying that you switched to the new branch you just created. 
    
    3. Now you are good to make changes to code and commit them: 
        1. See Sections 5 and 6
           
        2. git add .   (to stage all files that you’ve modified) 
    
    4. When ready to locally “save” those changes use: **git commit -m " code for this checkpoint"**
    
    5. To send them to your remote feature branch use: **git push origin featureBranchName** . The first time you do this your new branch will become visible on github  at https://github.com/adamw1221/CS495-Lab-Inventory-Group-F

### 5	Add Environment Variable File
This will connect the application to mongodb

1. Create a file named **.env** in the top lovel of folder **CS495-Lab-Inventory-Group-F**

2. Add this connection string:
    1. MONGODB_URI = mongodb+srv://LabAdmin:kNvoF1iXUX3GAfzk@inventory.8onczej.mongodb.net/?retryWrites=true&w=majority

3. Username: LabAdmin

4. password: kNvoF1iXUX3GAfzk
