import React from "react";

const Blog: React.FC = () => {
  return (
    <>
      <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container my-50 mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Bloglarımız
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Son Haberlerimiz
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  E-ticaret ve teknoloji dünyasındaki en güncel gelişmeleri,
                  ipuçlarını ve rehberleri burada bulabilirsiniz. Alışveriş
                  deneyiminizi geliştirecek içerikler için bizi takip edin.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <BlogCard
              date="26 Eylül 2025"
              CardTitle="2025'te E-Ticaret Trendleri: Yapay Zeka ve Kişiselleştirme"
              CardDescription="Yapay zeka destekli alışveriş deneyimleri, kişiselleştirilmiş öneriler ve otomasyon ile e-ticaret sektörü hızla değişiyor. 2025'te öne çıkan trendleri ve mağazanız için uygulama yollarını keşfedin."
              image="https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg"
            />
            <BlogCard
              date="18 Eylül 2025"
              CardTitle="Mobil Alışverişte Dönüşüm: Kullanıcı Deneyimi Nasıl Artırılır?"
              CardDescription="Mobil cihazlardan yapılan alışverişler her geçen yıl artıyor. Kullanıcı dostu arayüzler, hızlı ödeme ve güvenlik ipuçları ile mobil dönüşüm oranınızı artırmanın yollarını paylaşıyoruz."
              image="https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg"
            />
            <BlogCard
              date="10 Eylül 2025"
              CardTitle="Sosyal Medya ile Satışları Katlama Stratejileri"
              CardDescription="Instagram, Facebook ve TikTok gibi platformlarda etkili reklam ve içerik yönetimiyle satışlarınızı nasıl artırabileceğinizi anlatıyoruz. Sosyal medya entegrasyonu ile e-ticaret başarısı!"
              image="https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

interface BlogCardProps {
  image: string;
  date: string;
  CardTitle: string;
  CardDescription: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  date,
  CardTitle,
  CardDescription,
}) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <img src={image} alt="" className="w-full" />
          </div>
          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-body-color dark:text-dark-6">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
