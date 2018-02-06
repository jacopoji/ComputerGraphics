
# coding: utf-8

# In[60]:

'''
function result = comparagram(img1,img2,rgb)
%rgb ={1,2,3}
mapgram = zeros(256,256);

for i = 1:length(img1(:,1,rgb))
    for j = 1:length(img1(1,:,rgb))
        mapgram(img1(i,j,rgb)+1,img2(i,j,rgb)+1)= mapgram(img1(i,j,rgb)+1,img2(i,j,rgb)+1)+1;
    end
end

%mapgram(img1(:,:,rgb)+1,img2(:,:,rgb)+1)= mapgram(img1(:,:,rgb)+1,img2(:,:,rgb)+1)+1;
result = mapgram;
end
'''
import numpy as np
import matplotlib.pyplot as plt
import scipy.misc as sp
import matplotlib.animation as animation
from IPython.display import HTML

def comparagram(img1,img2,rgb):
    mapgram = np.zeros((256,256))
    for i in range(0,len(img1[:,1,rgb])):
        for j in range(0,len(img1[1,:,rgb])):
            mapgram[img1[i,j,rgb],img2[i,j,rgb]] = mapgram[img1[i,j,rgb],img2[i,j,rgb]]+1
    return mapgram


# In[54]:

'''

'''
image1 = sp.imread('/Users/Jacopo/Documents/ECE_4th_year_winter/ECE516/Comparagram/im1.jpeg')
image2 = sp.imread('/Users/Jacopo/Documents/ECE_4th_year_winter/ECE516/Comparagram/im2.jpeg')
image3 = sp.imread('/Users/Jacopo/Documents/ECE_4th_year_winter/ECE516/Comparagram/im3.jpeg')
image4 = sp.imread('/Users/Jacopo/Documents/ECE_4th_year_winter/ECE516/Comparagram/im4.jpeg')
################plot 1#################
R_channel1 = comparagram(image1,image2,0);
G_channel1 = comparagram(image1,image2,1);
B_channel1 = comparagram(image1,image2,2);
plot_img1 = np.zeros((256,256,3));
plot_img1[:,:,0]=R_channel1;
plot_img1[:,:,1]=G_channel1;
plot_img1[:,:,2]=B_channel1;
plt.imshow(plot_img1)
ax = plt.gca()
ax.invert_xaxis()
plt.title('Comparagram of the picture shown in class')
plt.show()
################plot 2##################
R_channel2 = comparagram(image3,image4,0);
G_channel2 = comparagram(image3,image4,1);
B_channel2 = comparagram(image3,image4,2);
plot_img2 = np.zeros((256,256,3));
plot_img2[:,:,0]=R_channel2;
plot_img2[:,:,1]=G_channel2;
plot_img2[:,:,2]=B_channel2;
plt.imshow(plot_img2)
ax = plt.gca()
ax.invert_xaxis()
plt.title('Comparagram of the pictures shared by Sen')
plt.show()


