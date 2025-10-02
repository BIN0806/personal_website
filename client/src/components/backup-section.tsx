import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Database, Download, FileText, CheckCircle } from "lucide-react";
import type { Backup } from "@shared/schema";

export default function BackupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: backups, isLoading } = useQuery({
    queryKey: ["/api/backups"],
  });

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    if (bytes >= 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return bytes + ' B';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getBackupIcon = (type: string) => {
    switch (type) {
      case 'campaigns': return Database;
      case 'assets': return FileText;
      case 'analytics': return Database;
      default: return Database;
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-8 bg-muted rounded w-3/4 mb-6"></div>
              <div className="h-12 bg-muted rounded w-full mb-6"></div>
              <div className="h-4 bg-muted rounded w-full mb-8"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            </div>
            <div className="h-96 bg-card rounded-2xl border"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-6">
              <Shield className="w-4 h-4" />
              Enterprise-Grade Security
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Automated Backup<br/>
              & Recovery
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Never lose your campaign data. Our automated backup system ensures your work is always safe with point-in-time recovery and version control.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Continuous Backup</h4>
                  <p className="text-muted-foreground">Automatic backups every 15 minutes keep your data safe without manual intervention.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Version History</h4>
                  <p className="text-muted-foreground">Access up to 90 days of version history with one-click restore functionality.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Encrypted Storage</h4>
                  <p className="text-muted-foreground">Military-grade encryption protects your data both in transit and at rest.</p>
                </div>
              </div>
            </div>
            
            <button 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              data-testid="button-learn-security"
            >
              Learn More About Security
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Backup Status</h3>
                <div className="status-badge status-active">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                  Active
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Last Backup</span>
                    <span className="text-sm font-semibold text-foreground" data-testid="text-last-backup">
                      {backups && backups.length > 0 ? formatTimeAgo(backups[0].createdAt) : '2 minutes ago'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full animate-pulse w-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Recent Backups</h4>
                  <div className="space-y-3">
                    {backups?.slice(0, 3).map((backup: Backup, index: number) => {
                      const IconComponent = getBackupIcon(backup.type);
                      
                      return (
                        <div 
                          key={backup.id} 
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          data-testid={`backup-item-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground capitalize">
                                {backup.type}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatTimeAgo(backup.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatFileSize(backup.size)}
                            </span>
                            <button className="text-xs font-medium text-primary hover:text-primary/80">
                              Restore
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Storage Used</div>
                      <div className="text-lg font-bold text-foreground" data-testid="text-storage-used">
                        {backups ? formatFileSize(backups.reduce((sum, b) => sum + b.size, 0)) : '2.4 GB'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Retention Period</div>
                      <div className="text-lg font-bold text-foreground">90 Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
