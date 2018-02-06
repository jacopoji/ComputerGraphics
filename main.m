tic;
image1 = imread('im1.jpeg'); %240x320
image2 = imread('im2.jpeg'); %240x320
image3 = imread('im3.jpeg'); %213x320
image4 = imread('im4.jpeg'); %213x320

R_channel1 = comparagram(image1,image2,1);
G_channel1 = comparagram(image1,image2,2);
B_channel1 = comparagram(image1,image2,3);
R_channel2 = comparagram(image3,image4,1);
G_channel2 = comparagram(image3,image4,2);
B_channel2 = comparagram(image3,image4,3);


plot_img1 = zeros(256,256,3);
plot_img1(:,:,1)=R_channel1;
plot_img1(:,:,2)=G_channel1;
plot_img1(:,:,3)=B_channel1;
plot_img2 = zeros(256,256,3);
plot_img2(:,:,1)=R_channel2;
plot_img2(:,:,2)=G_channel2;
plot_img2(:,:,3)=B_channel2;
figure
subplot(2,2,1),image(plot_img1)
set(gca,'XDir','reverse')
title('Comparagram of the picture shown in class')
subplot(2,2,3),image(image1)
subplot(2,2,4),image(image2)
figure
subplot(2,2,1),image(plot_img2)
set(gca,'XDir','reverse')
title('Comparagram of the pictures shared by Sen')
subplot(2,2,3),image(image3)
subplot(2,2,4),image(image4)
toc;
%%%%%%%%%%%%%%%%%%%%%%%%Self Taken Image%%%%%%%%%%%%%%%%%%%%%%%%%

tic;
image5 = imread('IMG01.jpg'); %3456x5184
image6 = imread('IMG02.jpg'); %3456x5184
%%%%%axis('square')
R_channel = comparagram(image5,image6,1);
G_channel = comparagram(image5,image6,2);
B_channel = comparagram(image5,image6,3);

plot_img = zeros(256,256,3);
plot_img(:,:,1)=R_channel;
plot_img(:,:,2)=G_channel;
plot_img(:,:,3)=B_channel;

figure
subplot(2,2,1),image(plot_img);
set(gca,'XDir','reverse')
title('Comparagram of the self taken picture')
subplot(2,2,3),image(image5)
title('Image taken with 0.25second exposure')
subplot(2,2,4),image(image6)
title('Image taken with 1/640second exposure')
toc;

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
