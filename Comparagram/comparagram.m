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