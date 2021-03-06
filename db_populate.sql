LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Admin','Admin','123 Fake St','Melbourne','VIC',3000,'admin@user.com','50000:j5F1R7bTED6nerYdiTkqKO2R39JQsaKV:5XbscL79BJsJCY6gJiLuV429Xmw=',1,1);
INSERT INTO `Users` VALUES (2,'User','Seller','123 Fake St','Melbourne','VIC',3000,'seller@user.com','50000:j5F1R7bTED6nerYdiTkqKO2R39JQsaKV:5XbscL79BJsJCY6gJiLuV429Xmw=',1,2);
INSERT INTO `Users` VALUES (3,'User','Searcher','123 Fake St','Melbourne','VIC',3000,'default@user.com','50000:j5F1R7bTED6nerYdiTkqKO2R39JQsaKV:5XbscL79BJsJCY6gJiLuV429Xmw=',1,2);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Listings` WRITE;
/*!40000 ALTER TABLE `Listings` DISABLE KEYS */;
INSERT INTO `Listings` VALUES (1, 2, 3000, 'Skyline R32 GTR Steering Wheel', NOW(), 'automotive', 950.00, 'product', 'Used with very minor marks but still is good condition, if you want to know more send me a message', 'goodcondition', NOW());
INSERT INTO `Listings` VALUES (2, 2, 3000, 'Bag of Shirts', NOW(), 'clothes', 5.00, 'product', 'A random box of assorted kids shirts ranging from size 6-10', 'goodcondition', NOW());
INSERT INTO `Listings` VALUES (3, 2, 3000, 'Ironing Board', NOW(), 'domestic', 50.00, 'product', 'Found an ironing board in the garage, never been used', 'unused', NOW());
INSERT INTO `Listings` VALUES (4, 2, 3000, 'Nintendo 3DS', NOW(), 'electronics',120.00, 'product', "I don't use it anymore since I bought a Switch... I don't know what model it is but I am happy to send photos if required.", 'wellused', NOW());
INSERT INTO `Listings` VALUES (5, 2, 3000, 'Various Plants and Herbs', NOW(), 'Gardening', 5.00, 'product', "I have many seedlings and maturing plants, herbs and flowers. Drop me a message if you'd like to know more or come by and have a look.", 'unused', NOW());
INSERT INTO `Listings` VALUES (6, 2, 3000, 'Wooden Boxes', NOW(), 'handcrafted', 30.00, 'product', "Hand crafted jewelry boxes, I can include a custom message aswell if you contact me in advance.", 'unused', NOW());
INSERT INTO `Listings` VALUES (7, 2, 3000, 'Random Bag of Tools', NOW(), 'hardware', 100.00, 'product', "Not really sure what is here, welcome to come and take a look and make an offer", 'wellused', NOW());
INSERT INTO `Listings` VALUES (8, 2, 3000, 'Pedistal Drill (NR)', NOW(), 'industrial', 150.00, 'product', "Needs some work to get back into working condition but the parts are solid, make me an offer", 'needsrepair', NOW());
INSERT INTO `Listings` VALUES (9, 2, 3000, 'Tennis Racket', NOW(), 'sporting', 10.00, 'product', "Used it once, I will never play again... the shame!", 'likenew', NOW());
INSERT INTO `Listings` VALUES (10, 2, 3000, 'Transformers G1 Optimus Prime', NOW(), 'toys', 80.00, 'product', "Not in box, showing some signs of age but still in pretty good condition", 'goodcondition', NOW());
INSERT INTO `Listings` VALUES (11, 2, 3000, 'Assorted Box of Stuffs', NOW(), 'misc', 50.00, 'product', "Found a box in the garage full of random things, come check it out!", 'wellused', NOW());
INSERT INTO `Listings` VALUES (12, 2, 3000, 'Carpenter Available', NOW(), 'carpentry', 120.00, 'service', 'Available for all of your carpentry needs, send me a message.', 'qualandcert', NOW());
INSERT INTO `Listings` VALUES (13, 2, 3000, 'Fabricator Available', NOW(), 'fabrication', 200.00, 'service', 'Available most days, give me a buzz and we will work something out', 'qualandcert', NOW());
INSERT INTO `Listings` VALUES (14, 2, 3000, 'Experience Landscapper 20+ Years', NOW(), 'landscaping', 80.00, 'service', 'Looking for jobs on Mondays and Thursday, I can do it all!', 'unqualcert', NOW());
INSERT INTO `Listings` VALUES (15, 2, 3000, 'Mechanic Available for House Calls', NOW(), 'mechanical', 180.00, 'service', 'Experiences mechanic to diagnos your car troubles, can come to your house even', 'qualandcert', NOW());
INSERT INTO `Listings` VALUES (16, 2, 3000, 'Plumber Available', NOW(), 'plumbing', 90.00, 'service', 'Available for all of your plumbing needs, send me a message.', 'qualified', NOW());
INSERT INTO `Listings` VALUES (17, 2, 3000, 'School drop off and pickup available', NOW(), 'transport', 40.00, 'service', 'Slots filling quickly, available in surrounding area', 'unqualcert', NOW());
/*!40000 ALTER TABLE `Listings` ENABLE KEYS */;
UNLOCK TABLES;